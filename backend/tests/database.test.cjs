const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const database = require('../dist/config/database');
const { env, validateProductionEnvironment } = require('../dist/config/environment');
const originalConnect = mongoose.connect;
const originalState = mongoose.connection.readyState;
after(() => { mongoose.connect = originalConnect; mongoose.connection.readyState = originalState; });

test('concurrent requests share one connection attempt and reuse an open connection', async () => {
  mongoose.connection.readyState = 0;
  let calls = 0;
  let complete;
  mongoose.connect = async () => {
    calls++;
    await new Promise(resolve => { complete = resolve; });
    mongoose.connection.readyState = 1;
    return mongoose;
  };
  const a = database.connectDatabase();
  const b = database.connectDatabase();
  assert.equal(calls, 1);
  complete();
  await Promise.all([a, b]);
  await database.connectDatabase();
  assert.equal(calls, 1);
});

test('a failed connection can retry without terminating the function process', async () => {
  mongoose.connection.readyState = 0;
  let calls = 0;
  mongoose.connect = async () => {
    if (++calls === 1) throw new Error('Database unavailable');
    mongoose.connection.readyState = 1;
    return mongoose;
  };
  await assert.rejects(database.connectDatabase(), /Database unavailable/);
  await database.connectDatabase();
  assert.equal(calls, 2);
});

test('production refuses missing database settings, demo secrets and local disk uploads on Vercel', () => {
  const original = { ...env };
  try {
    env.isProduction = true;
    env.isVercel = true;
    env.MONGODB_URI = '';
    assert.throws(validateProductionEnvironment, /MONGODB_URI/);
    env.MONGODB_URI = 'mongodb://example.invalid/test';
    env.JWT_SECRET = 'super_secret_jwt_key_change_in_production_9f83a21b4';
    assert.throws(validateProductionEnvironment, /JWT_SECRET/);
    env.JWT_SECRET = 'a-unique-test-secret-of-at-least-32-characters';
    env.CV_STORAGE = 'local';
    assert.throws(validateProductionEnvironment, /persistent/);
    env.CV_STORAGE = 'blob';
    assert.doesNotThrow(validateProductionEnvironment);
  } finally { Object.assign(env, original); }
});
