const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const Module = require('node:module');
const { createServer } = require('node:http');
const { once } = require('node:events');

const { env } = require('../dist/config/environment');
env.JWT_SECRET = 'test-secret-for-cv-tickets-not-a-production-secret';
env.BLOB_READ_WRITE_TOKEN = 'test-blob-token';
env.CV_STORAGE = 'blob';
const authorization = require('../dist/services/cvAuthorization');
let metadata;
let deletionError;
const deleted = [];
const originalLoad = Module._load;
Module._load = function (name, ...args) {
  if (name === '@vercel/blob') return {
    head: async () => metadata,
    del: async (key) => { if (deletionError) throw deletionError; deleted.push(key); },
    get: async () => ({
      statusCode: 200,
      stream: new ReadableStream({
        start(controller) {
          for (let i = 0; i < 6; i++) controller.enqueue(new Uint8Array(1024 * 1024).fill(7));
          controller.close();
        },
      }),
    }),
  };
  return originalLoad.call(this, name, ...args);
};
const storage = require('../dist/services/cvStorage');
Module._load = originalLoad;
const { TalentApplication } = require('../dist/models/TalentApplication');
const applicationService = require('../dist/services/applicationService');
after(() => { Module._load = originalLoad; });

test('upload authorizations enforce type, non-empty files, and the 10 MB limit', () => {
  const ticket = authorization.issueCvTicket({ name: 'Resume.DOCX', size: 10 * 1024 * 1024, contentType: 'application/octet-stream' });
  assert.match(ticket.pathname, /^cvs\/[a-f0-9-]+\.docx$/);
  assert.equal(authorization.readCvTicket(ticket.token).size, 10 * 1024 * 1024);
  for (const input of [
    { name: 'resume.exe', size: 1, contentType: 'application/pdf' },
    { name: '../resume.pdf', size: 1 },
    { name: 'resume.pdf', size: 0 },
    { name: 'resume.pdf', size: 10 * 1024 * 1024 + 1 },
    { name: 'resume.pdf', size: 1, contentType: 'image/png' },
  ]) assert.throws(() => authorization.issueCvTicket(input));
});

test('modified, expired and administrator tokens cannot authorize a document', () => {
  const issued = authorization.issueCvTicket({ name: 'resume.pdf', size: 20 });
  assert.throws(() => authorization.readCvTicket(issued.token.slice(0, -10) + 'tampered'));
  const payload = authorization.readCvTicket(issued.token);
  const expired = jwt.sign(payload, env.JWT_SECRET, { audience: 'cv-upload', issuer: 'ghanatech-global', expiresIn: -1 });
  assert.throws(() => authorization.readCvTicket(expired));
  const adminToken = jwt.sign({ userId: 'test-user', role: 'admin' }, env.JWT_SECRET);
  assert.throws(() => authorization.readCvTicket(adminToken));
});

test('CV metadata must match the signed path, size and MIME type', () => {
  const issued = authorization.issueCvTicket({ name: 'resume.pdf', size: 20 });
  const ticket = authorization.readCvTicket(issued.token);
  authorization.verifyCvMetadata(ticket, { pathname: ticket.pathname, size: 20, contentType: 'application/pdf' });
  for (const change of [{ pathname: 'cvs/someone-else.pdf' }, { size: 21 }, { contentType: 'image/png' }]) {
    assert.throws(() => authorization.verifyCvMetadata(ticket, { ...ticket, ...change }));
  }
});

test('only an existing matching document in private storage can be attached', async () => {
  const issued = authorization.issueCvTicket({ name: 'resume.pdf', size: 20 });
  const ticket = authorization.readCvTicket(issued.token);
  metadata = { ...ticket, url: 'https://test.private.blob.vercel-storage.com/' + ticket.pathname };
  const cv = await storage.resolveUploadedCv(issued.token);
  assert.equal(cv.cvStorage, 'blob');
  assert.equal(cv.cvStorageKey, ticket.pathname);
  metadata.url = 'https://test.public.blob.vercel-storage.com/' + ticket.pathname;
  await assert.rejects(storage.resolveUploadedCv(issued.token), /private/);
  metadata.url = 'https://test.private.blob.vercel-storage.com/' + ticket.pathname;
  metadata.size = 30;
  await assert.rejects(storage.resolveUploadedCv(issued.token), /does not match/);
});

test('private CV downloads stream files larger than a function request limit', async () => {
  const express = require('express');
  const app = express();
  app.get('/download', async (_req, res) => {
    await storage.sendStoredCv({ cvStorage: 'blob', cvStorageKey: 'cvs/test.pdf', cvOriginalName: 'resume.pdf', cvMimeType: 'application/pdf' }, res);
  });
  const server = createServer(app).listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    const response = await fetch('http://127.0.0.1:' + server.address().port + '/download');
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('cache-control'), 'private, no-store');
    assert.match(response.headers.get('content-disposition'), /attachment.*resume.pdf/);
    assert.equal((await response.arrayBuffer()).byteLength, 6 * 1024 * 1024);
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});

test('a document deletion failure preserves the application for a later retry', async () => {
  let recordDeleted = false;
  const originalFind = TalentApplication.findById;
  const application = { cvStorage: 'blob', cvStorageKey: 'cvs/test.pdf', deleteOne: async () => { recordDeleted = true; } };
  TalentApplication.findById = async () => application;
  try {
    deletionError = new Error('Storage unavailable');
    await assert.rejects(applicationService.deleteApplication('test'), /Storage unavailable/);
    assert.equal(recordDeleted, false);
    deletionError = undefined;
    await applicationService.deleteApplication('test');
    assert.equal(recordDeleted, true);
    assert.deepEqual(deleted, ['cvs/test.pdf']);
  } finally { TalentApplication.findById = originalFind; deletionError = undefined; }
});
