const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const newsletterRoutes = require('../dist/routes/newsletterRoutes').default;
const { NewsletterSubscriber } = require('../dist/models/NewsletterSubscriber');

let writes;
const originalUpdate = NewsletterSubscriber.updateOne;
const originalState = mongoose.connection.readyState;
const subscribeHandler = newsletterRoutes.stack.find(layer => layer.route?.path === '/subscribe').route.stack[0].handle;

beforeEach(() => {
  mongoose.connection.readyState = 1;
  writes = [];
  NewsletterSubscriber.updateOne = async (...args) => {
    writes.push(args);
    return { acknowledged: true, upsertedCount: 1 };
  };
});

after(() => {
  NewsletterSubscriber.updateOne = originalUpdate;
  mongoose.connection.readyState = originalState;
});

async function subscribe(body) {
  const response = {
    statusCode: 200,
    body: undefined,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = JSON.parse(JSON.stringify(payload)); return this; },
  };
  await subscribeHandler({ body }, response, () => response.status(500).json({ success: false }));
  return { status: response.statusCode, json: async () => response.body };
}

test('invalid email input is rejected without saving a subscriber', async () => {
  for (const body of [{}, { email: null }, { email: 'invalid' }, { email: ['person@example.com'] }, { email: `${'a'.repeat(250)}@example.com` }]) {
    const response = await subscribe(body);
    assert.equal(response.status, 400);
    assert.equal((await response.json()).success, false);
  }
  assert.equal(writes.length, 0);
});

test('a signup saves a normalized email using an atomic upsert', async () => {
  const response = await subscribe({ email: '  Person@Example.COM  ' });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.deepEqual(writes, [[
    { email: 'person@example.com' },
    { $setOnInsert: { email: 'person@example.com' } },
    { upsert: true, runValidators: true },
  ]]);
});

test('a duplicate signup is successful without exposing an existing subscription', async () => {
  NewsletterSubscriber.updateOne = async () => { throw Object.assign(new Error('duplicate'), { code: 11000 }); };
  const response = await subscribe({ email: 'person@example.com' });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, message: 'Thanks for subscribing!' });
});

test('an unavailable database cannot produce a successful signup', async () => {
  mongoose.connection.readyState = 0;
  const response = await subscribe({ email: 'person@example.com' });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, false);
  assert.equal(writes.length, 0);
});

test('a failed write cannot produce a successful signup', async () => {
  NewsletterSubscriber.updateOne = async () => { throw new Error('Write failed'); };
  const response = await subscribe({ email: 'person@example.com' });
  assert.equal(response.status, 500);
  assert.equal((await response.json()).success, false);
});
