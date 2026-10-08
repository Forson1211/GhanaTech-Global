const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createServer } = require('node:http');
const { once } = require('node:events');
const backendRequire = require('node:module').createRequire(path.join(__dirname, '../backend/package.json'));
const mongoose = backendRequire('mongoose');
const { env } = require('../backend/dist/config/environment');
const originalEnvironment = { ...env };
const originalState = mongoose.connection.readyState;
env.isProduction = true;
env.isVercel = true;
env.MONGODB_URI = 'mongodb://example.invalid/test';
env.JWT_SECRET = 'test-production-secret-not-used-for-a-real-deployment';
env.CV_STORAGE = 'blob';
const handler = require('../api/index.js');
mongoose.connection.readyState = 1;
after(() => { Object.assign(env, originalEnvironment); mongoose.connection.readyState = originalState; });

test('Vercel services configuration routes /api to backend and other paths to frontend', () => {
  const config = require('../vercel.json');
  assert.ok(config.services);
  assert.equal(config.services.backend.framework, 'express');
  assert.equal(config.services.frontend.framework, 'vite');
  assert.ok(config.services.frontend.rewrites.some(rule => rule.source === '/(.*)' && rule.destination === '/index.html'));
  assert.equal(typeof require('../backend/dist/app').default, 'function', 'The detected Express entrypoint must export its application');
  assert.ok(Array.isArray(config.services.backend.bindings));
  assert.equal(config.services.backend.bindings[0].service, 'frontend');
  assert.equal(config.services.backend.bindings[0].env, 'FRONTEND_URL');
  const matchesApi = url => config.rewrites.filter(r => r.destination?.service === 'backend').some(r => new RegExp('^' + r.source + '$').test(url));
  for (const url of ['/api', '/api/health', '/api/applications', '/api/applications/admin/id/cv']) assert.equal(matchesApi(url), true);
  for (const url of ['/', '/about', '/join-talent', '/images/african-office-team.jpg']) assert.equal(matchesApi(url), false);
  const lock = require('../package-lock.json');
  const rootPackage = require('../package.json');
  const backendPackage = require('../backend/package.json');
  for (const [dependency, version] of Object.entries(backendPackage.dependencies)) {
    assert.equal(rootPackage.dependencies[dependency], version, `${dependency} must be resolvable from Vercel's generated root-level bundle`);
    assert.ok(lock.packages['node_modules/' + dependency], `${dependency} must be installed at the root`);
  }
  assert.ok(lock.packages['backend'].dependencies['@vercel/blob']);
  assert.ok(lock.packages['frontend'].dependencies['@vercel/blob']);
  const frontend = require('../frontend/vercel.json');
  assert.ok(frontend.rewrites.some(rule => rule.source === '/(.*)' && rule.destination === '/index.html'), 'Vue deep links must load index.html within the frontend service');
  const publicVercel = require('../frontend/public/vercel.json');
  assert.ok(publicVercel.rewrites.some(rule => rule.source === '/(.*)' && rule.destination === '/index.html'), 'Vite public vercel.json must preserve SPA rewrites in dist output');
});

test('one deployed handler returns API JSON, protects CVs, and fails honestly when misconfigured', async () => {
  const server = createServer(handler).listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = 'http://127.0.0.1:' + server.address().port;
  try {
    let response = await fetch(base + '/api/health?check=1');
    assert.equal(response.status, 200);
    assert.equal((await response.json()).success, true);
    response = await fetch(base + '/api/does-not-exist');
    assert.equal(response.status, 404);
    assert.match(response.headers.get('content-type'), /json/);
    response = await fetch(base + '/api/applications/admin/test/cv');
    assert.equal(response.status, 401);
    response = await fetch(base + '/uploads/cvs/test.pdf');
    assert.equal(response.status, 404);
    response = await fetch(base + '/api/applications/upload-config');
    assert.equal((await response.json()).data.directUpload, true);
    env.MONGODB_URI = '';
    response = await fetch(base + '/api/health');
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.equal(body.success, false);
    assert.equal(JSON.stringify(body).includes(env.JWT_SECRET), false);
  } finally {
    env.MONGODB_URI = 'mongodb://example.invalid/test';
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});

test('the Express service returns a retryable JSON error when production configuration is missing', async () => {
  const { createApp } = require('../backend/dist/app');
  const previous = env.MONGODB_URI;
  env.MONGODB_URI = '';
  const server = createServer(createApp()).listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    const response = await fetch('http://127.0.0.1:' + server.address().port + '/api/health');
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal((await response.json()).success, false);
  } finally {
    env.MONGODB_URI = previous;
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});
