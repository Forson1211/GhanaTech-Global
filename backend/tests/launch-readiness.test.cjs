const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const script = path.resolve(__dirname, '../dist/scripts/checkLaunch.js');
const valid = {
  MONGODB_URI: 'mongodb+srv://user:private-db-value@cluster.example.com/production',
  JWT_SECRET: 'private-jwt-value-which-is-long-enough-for-production',
  CV_STORAGE: 'blob', BLOB_READ_WRITE_TOKEN: 'private-blob-value',
  CLIENT_URL: 'https://example.com', SITE_URL: 'https://example.com',
  CRON_SECRET: 'private-cron-value-which-is-long-enough',
  EMAIL_DELIVERY_ENABLED: 'true', RESEND_API_KEY: 'private-email-value', EMAIL_FROM: 'GhanaTech <sender@example.com>',
};
function run(overrides) { return spawnSync(process.execPath, [script], { env: { ...process.env, ...valid, ...overrides }, encoding: 'utf8', timeout: 15000 }); }
test('launch readiness accepts complete configuration without disclosing secrets', () => {
  const result = run({});
  assert.equal(result.status, 0, result.stdout + result.stderr);
  for (const key of ['MONGODB_URI', 'JWT_SECRET', 'BLOB_READ_WRITE_TOKEN', 'CRON_SECRET', 'RESEND_API_KEY']) assert.ok(!result.stdout.includes(valid[key]));
  assert.match(result.stdout, /Database\/content not inspected/);
});
test('launch readiness blocks local databases, demo secrets, incomplete delivery and canonical mismatches', () => {
  const result = run({ MONGODB_URI: 'mongodb://127.0.0.1:27017/test', JWT_SECRET: 'local_development_only_change_before_deployment', BLOB_READ_WRITE_TOKEN: '', EMAIL_DELIVERY_ENABLED: 'false', SITE_URL: 'http://localhost:5173' });
  assert.equal(result.status, 1);
  for (const label of ['Hosted MONGODB_URI', 'Unique JWT_SECRET', 'Private Blob storage', 'HTTPS SITE_URL', 'Matching canonical', 'Enabled transactional email']) assert.ok(result.stdout.includes('MISSING ' + label));
});
