const assert = require('node:assert/strict');
const supplied = process.argv[2];
if (!supplied) { console.error('Usage: npm run launch:smoke -- https://your-domain.com'); process.exit(1); }
const base = new URL(supplied);
if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password) throw new Error('Provide a website URL without credentials.');
let failures = 0;
async function check(path, verify) {
  try {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000), redirect: 'follow' });
    await verify(response);
    console.log('PASS ' + path);
  } catch { failures++; console.error('FAIL ' + path + ' (unexpected response or connection failure)'); }
}
async function main() {
  for (const path of ['/', '/join-talent', '/hire-talent', '/admin/login']) await check(path, async res => {
    assert.equal(res.status, 200); assert.match(res.headers.get('content-type') || '', /text\/html/); assert.match(await res.text(), /id=["']app["']/);
  });
  await check('/api/health', async res => { assert.equal(res.status, 200); assert.equal((await res.json()).success, true); });
  await check('/api/does-not-exist', async res => { assert.equal(res.status, 404); assert.equal((await res.json()).success, false); });
  await check('/api/auth/me', async res => { assert.equal(res.status, 401); assert.equal((await res.json()).success, false); });
  for (const path of ['/api/services', '/api/categories', '/api/calculator/configs', '/api/jobs']) await check(path, async res => { assert.equal(res.status, 200); assert.equal((await res.json()).success, true); });
  await check('/robots.txt', async res => { assert.equal(res.status, 200); const body = await res.text(); assert.match(body, /Disallow: \/admin/); assert.ok(body.includes('Sitemap: ' + base.origin + '/sitemap.xml')); });
  await check('/sitemap.xml', async res => { assert.equal(res.status, 200); assert.match(res.headers.get('content-type') || '', /xml/); const body = await res.text(); assert.match(body, /<urlset/); assert.ok(body.includes('<loc>' + base.origin + '/')); assert.doesNotMatch(body, /localhost|127\.0\.0\.1/); });
  console.log('Read-only checks finished. Login, submissions, document access, and email delivery still require authenticated end-to-end verification.');
  process.exitCode = failures ? 1 : 0;
}
main().catch(() => { console.error('Smoke check could not complete.'); process.exitCode = 1; });
