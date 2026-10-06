import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { createRenderer, nextTick } from 'vue';
import { parse, compileScript } from '@vue/compiler-sfc';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const sourceUrl = new URL('../src/components/home/TrustStatisticsSection.vue', import.meta.url);
const countSource = readFileSync(new URL('../src/utils/countUp.ts', import.meta.url), 'utf8');
const transpile = source => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const moduleUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const countUrl = moduleUrl(transpile(countSource));
const { parseCountValue, formatCountValue } = await import(countUrl);
const { descriptor } = parse(readFileSync(sourceUrl, 'utf8'));
let componentSource = transpile(compileScript(descriptor, { id: 'statistics-test', inlineTemplate: true }).content);
componentSource = componentSource
  .replace(/from (['"])vue\1/g, `from '${pathToFileURL(require.resolve('vue/dist/vue.runtime.esm-bundler.js')).href}'`)
  .replace(/from (['"])lucide-vue-next\1/g, `from '${pathToFileURL(require.resolve('lucide-vue-next')).href}'`)
  .replace(/import \{ statisticsService \} from ['"]@\/services\/statistics['"];?/, 'const statisticsService = { getPublicStatistics: (...args) => globalThis.__statisticsService.getPublicStatistics(...args) };')
  .replace(/from ['"]@\/utils\/countUp['"]/g, `from '${countUrl}'`);
const { default: Statistics } = await import(moduleUrl(componentSource));

function node(type, text = '') { return { type, text, props: {}, children: [], parent: null }; }
function insert(child, parent, anchor) {
  if (child.parent) child.parent.children.splice(child.parent.children.indexOf(child), 1);
  child.parent = parent;
  const position = anchor ? parent.children.indexOf(anchor) : -1;
  parent.children.splice(position < 0 ? parent.children.length : position, 0, child);
}
const renderer = createRenderer({
  createElement: type => node(type), createText: text => node('#text', text), createComment: text => node('#comment', text),
  insert, remove: child => child.parent?.children.splice(child.parent.children.indexOf(child), 1),
  setElementText: (element, text) => { element.text = text; element.children = []; },
  setText: (element, text) => { element.text = text; },
  patchProp: (element, key, _previous, value) => { element.props[key] = value; },
  parentNode: element => element.parent,
  nextSibling: element => element.parent?.children[element.parent.children.indexOf(element) + 1],
  setScopeId() {},
  insertStaticContent: (content, parent, anchor) => { const element = node('#static', content); insert(element, parent, anchor); return [element, element]; },
});
function descendants(element) { return [element, ...element.children.flatMap(descendants)]; }
function text(element) { return element.text + element.children.map(text).join(''); }

function mountStatistics(reducedMotion = false) {
  const original = Object.fromEntries(['window', 'IntersectionObserver', 'requestAnimationFrame', 'cancelAnimationFrame', '__statisticsService'].map(key => [key, globalThis[key]]));
  const frames = new Map();
  let id = 0;
  let observer;
  let resolveData;
  let requestSignal;
  const listeners = new Set();
  const preference = { matches: reducedMotion, addEventListener: (_event, listener) => listeners.add(listener), removeEventListener: (_event, listener) => listeners.delete(listener) };
  class Observer {
    constructor(callback) { this.callback = callback; this.disconnected = false; observer = this; }
    observe(element) { this.element = element; }
    disconnect() { this.disconnected = true; }
  }
  globalThis.window = { matchMedia: () => preference, IntersectionObserver: Observer };
  globalThis.IntersectionObserver = Observer;
  globalThis.requestAnimationFrame = callback => { frames.set(++id, callback); return id; };
  globalThis.cancelAnimationFrame = frame => frames.delete(frame);
  globalThis.__statisticsService = { getPublicStatistics: signal => { requestSignal = signal; return new Promise(resolve => { resolveData = resolve; }); } };
  const root = node('root');
  const app = renderer.createApp(Statistics);
  app.mount(root);
  return {
    frames,
    values: () => descendants(root).filter(element => element.props.class?.split(' ').includes('stat-value')).map(element => text(element.children.find(child => child.props['aria-hidden'] === 'true'))),
    visible: () => observer.callback([{ isIntersecting: true }]),
    async frame(time) { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback(time)); await nextTick(); },
    async reduced() { preference.matches = true; listeners.forEach(listener => listener({ matches: true })); await nextTick(); },
    async data(value) { resolveData(value); await Promise.resolve(); await nextTick(); },
    get observer() { return observer; },
    get signal() { return requestSignal; },
    listeners,
    unmount() { app.unmount(); },
    restore() { app.unmount(); for (const [key, value] of Object.entries(original)) { if (value === undefined) delete globalThis[key]; else globalThis[key] = value; } },
  };
}

test('count formatting preserves suffixes and decimal precision; text stays static', () => {
  assert.equal(parseCountValue('U.S. ↔ Ghana'), null);
  assert.equal(parseCountValue('2026-10'), null);
  assert.equal(formatCountValue(parseCountValue('100+'), 50), '50+');
  assert.equal(formatCountValue(parseCountValue('99.5%'), 50.12), '50.1%');
  assert.equal(formatCountValue(parseCountValue('1,200+'), 1200), '1,200+');
  assert.equal(formatCountValue(parseCountValue('25+'), 30), '25+');
});

test('counters wait for visibility, finish at the exact totals, and play only once', async () => {
  const harness = mountStatistics();
  try {
    assert.equal(harness.frames.size, 0);
    harness.visible(); await nextTick();
    assert.deepEqual(harness.values(), ['0+', '0+', '0', 'U.S. ↔ Ghana']);
    await harness.frame(0);
    await harness.frame(800);
    assert.ok(parseInt(harness.values()[0]) > 0 && parseInt(harness.values()[0]) < 100);
    assert.equal(harness.values()[3], 'U.S. ↔ Ghana');
    await harness.frame(1600);
    assert.deepEqual(harness.values(), ['100+', '25+', '4', 'U.S. ↔ Ghana']);
    assert.equal(harness.frames.size, 0);
    assert.equal(harness.observer.disconnected, true);
    harness.visible(); assert.equal(harness.frames.size, 0);
  } finally { harness.restore(); }
});

test('reduced motion shows complete totals without scheduling animation', () => {
  const harness = mountStatistics(true);
  try {
    assert.deepEqual(harness.values(), ['100+', '25+', '4', 'U.S. ↔ Ghana']);
    assert.equal(harness.frames.size, 0);
    assert.equal(harness.observer, undefined);
  } finally { harness.restore(); }
});

test('enabling reduced motion cancels an active animation', async () => {
  const harness = mountStatistics();
  try {
    harness.visible(); await harness.frame(0);
    assert.equal(harness.frames.size, 1);
    await harness.reduced();
    assert.equal(harness.frames.size, 0);
    assert.deepEqual(harness.values(), ['100+', '25+', '4', 'U.S. ↔ Ghana']);
  } finally { harness.restore(); }
});

test('published API totals replace fallback figures without replaying the count', async () => {
  const harness = mountStatistics();
  try {
    harness.visible(); await harness.frame(0);
    await harness.data({ success: true, data: [{ key: 'professionals', value: '250+', label: 'Professionals', order: 1, isPublished: true }] });
    assert.deepEqual(harness.values(), ['250+']);
    assert.equal(harness.frames.size, 0);
  } finally { harness.restore(); }
});

test('unmount disconnects the observer, cancels frames, and aborts the request', () => {
  const harness = mountStatistics();
  try {
    harness.visible(); harness.unmount();
    assert.equal(harness.frames.size, 0);
    assert.equal(harness.observer.disconnected, true);
    assert.equal(harness.signal.aborted, true);
    assert.equal(harness.listeners.size, 0);
  } finally { harness.restore(); }
});
