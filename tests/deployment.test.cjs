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

test('Vercel routes reserve /api and serve real assets before the SPA fallback', () => {
  const config = require('../vercel.json');
  const matchesApi = url => config.routes.filter(route => route.src && route.dest === '/api/index.js').some(route => new RegExp('^' + route.src + '$').test(url));
  for (const url of ['/api', '/api/health', '/api/applications', '/api/applications/admin/id/cv']) assert.equal(matchesApi(url), true);
  for (const url of ['/', '/about', '/join-talent', '/images/african-office-team.jpg']) assert.equal(matchesApi(url), false);
  assert.equal(config.routes[2].handle, 'filesystem');
  assert.equal(config.routes.at(-1).dest, '/index.html');
  assert.ok(fs.existsSync(path.join(__dirname, '..', config.outputDirectory, 'index.html')));
  const lock = require('../package-lock.json');
  assert.ok(lock.packages['backend'].dependencies['@vercel/blob']);
  assert.ok(lock.packages['frontend'].dependencies['@vercel/blob']);
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
