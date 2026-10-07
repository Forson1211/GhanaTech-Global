const { test } = require('node:test');
const assert = require('node:assert/strict');
const { jobSchema, contentSchema, publishedJobFilter } = require('../dist/validators/publishingValidator');
const { updateProfileSchema } = require('../dist/validators/authValidator');
const { publicSettings } = require('../dist/routes/publicSettingsRoutes');
const { deliverEmail, processEmailOutbox } = require('../dist/services/emailDelivery');
const { EmailNotification } = require('../dist/models/EmailNotification');
const { createApp } = require('../dist/app');

const job = { title: 'Software Engineer', category: 'Software Engineering', type: 'Full-time', description: 'Build and maintain reliable software for our client.', status: 'draft' };
test('publishing accepts validated drafts and rejects invalid statuses, URLs and dates', () => {
  assert.equal(jobSchema.parse(job).status, 'draft');
  assert.equal(jobSchema.safeParse({ ...job, status: 'injected' }).success, false);
  assert.equal(jobSchema.safeParse({ ...job, closesAt: 'not-a-date' }).success, false);
  assert.deepEqual(jobSchema.parse({ ...job, internalNotes: 'injected' }).techStack, []);
  const now = new Date('2026-10-07T12:00:00Z');
  assert.equal(publishedJobFilter(now).status, 'published');
  assert.equal(publishedJobFilter(now).$or[1].closesAt.$gt, now);
  const content = { kind: 'privacy', title: 'Privacy Policy', slug: 'something-else', body: 'Approved information about the data used by this website.', status: 'draft' };
  assert.equal(contentSchema.parse(content).slug, 'privacy');
  assert.equal(contentSchema.safeParse({ ...content, imageUrl: 'javascript:alert(1)' }).success, false);
});
test('public settings exclude internal and unknown properties', () => {
  const value = publicSettings({ companyName: 'GhanaTech Global', contactEmail: 'team@example.com', secret: 'private', _id: 'private-id' });
  assert.equal(value.secret, undefined); assert.equal(value._id, undefined); assert.equal(value.contactEmail, 'team@example.com');
});
test('profile password changes require a current password and twelve characters', () => {
  assert.equal(updateProfileSchema.safeParse({ newPassword: 'short', currentPassword: 'old-password' }).success, false);
  assert.equal(updateProfileSchema.safeParse({ newPassword: 'long-new-password' }).success, false);
  assert.equal(updateProfileSchema.safeParse({ newPassword: 'long-new-password', currentPassword: 'old-password' }).success, true);
});
test('email provider acknowledgements use stable idempotency keys and disabled delivery sends nothing', async () => {
  const original = { enabled: process.env.EMAIL_DELIVERY_ENABLED, key: process.env.RESEND_API_KEY, from: process.env.EMAIL_FROM };
  try {
    process.env.EMAIL_DELIVERY_ENABLED = 'false';
    assert.deepEqual(await processEmailOutbox(), { configured: false, sent: 0, failed: 0 });
    let calls = 0; const message = { sourceId: 'test-source', kind: 'confirmation', to: 'recipient@example.com', subject: 'Confirmation', text: 'Received.' };
    await assert.rejects(deliverEmail(message, async () => { calls++; }), /not configured/); assert.equal(calls, 0);
    process.env.EMAIL_DELIVERY_ENABLED = 'true'; process.env.RESEND_API_KEY = 'test-only'; process.env.EMAIL_FROM = 'GhanaTech <test@example.com>';
    const keys = [];
    const provider = async (_url, options) => { calls++; keys.push(options.headers['Idempotency-Key']); assert.equal(JSON.parse(options.body).to[0], message.to); return { ok: true, json: async () => ({ id: 'provider-message' }) }; };
    assert.equal(await deliverEmail(message, provider), 'provider-message'); await deliverEmail(message, provider); assert.equal(keys[0], keys[1]);
    await assert.rejects(deliverEmail(message, async () => ({ ok: false, status: 429 })), /429/);
    await assert.rejects(deliverEmail(message, async () => ({ ok: true, json: async () => ({}) })), /acknowledge/);
  } finally { for (const [key, value] of Object.entries({ EMAIL_DELIVERY_ENABLED: original.enabled, RESEND_API_KEY: original.key, EMAIL_FROM: original.from })) { if (value === undefined) delete process.env[key]; else process.env[key] = value; } }
});
test('publishing, communications, sign-in history and cron endpoints reject unauthenticated requests', async () => {
  const server = createApp().listen(0); await new Promise(resolve => server.once('listening', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  try {
    for (const path of ['/api/jobs/admin/all', '/api/content/admin/all', '/api/admin/communications', '/api/auth/activity', '/api/cron/communications']) {
      const response = await fetch(base + path); assert.equal(response.status, 401, path);
    }
    const robots = await (await fetch(base + '/robots.txt')).text(); assert.match(robots, /Disallow: \/admin/); assert.match(robots, /Sitemap:/);
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});
