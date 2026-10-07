const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs/promises');
const { randomBytes } = require('node:crypto');

test('complete launch workflows persist safely in an isolated local database', { skip: process.env.RUN_DB_INTEGRATION !== 'true', timeout: 90000 }, async () => {
  const databaseName = 'ghanatech_launch_test_' + randomBytes(6).toString('hex');
  process.env.EMAIL_DELIVERY_ENABLED = 'false';
  process.env.CV_STORAGE = 'local';
  process.env.JWT_SECRET = 'integration-test-only-secret-which-is-not-a-production-key';
  const mongoose = require('mongoose');
  const bcrypt = require('bcryptjs');
  const { env } = require('../dist/config/environment');
  const uploadRoot = path.resolve(__dirname, '../../.tmp', databaseName);
  env.UPLOAD_DIR = uploadRoot; env.CV_STORAGE = 'local'; env.JWT_SECRET = process.env.JWT_SECRET; env.isProduction = false;
  const { createApp } = require('../dist/app');
  const { User } = require('../dist/models/User');
  const { SiteSettings } = require('../dist/models/SiteSettings');
  const { TalentApplication } = require('../dist/models/TalentApplication');
  const { CompanyLead } = require('../dist/models/CompanyLead');
  const { EmailNotification } = require('../dist/models/EmailNotification');
  await mongoose.connect('mongodb://127.0.0.1:27017/' + databaseName, { serverSelectionTimeoutMS: 10000 });
  let server;
  try {
    await User.create({ name: 'Test Administrator', email: 'admin@example.com', password: await bcrypt.hash('TestPassword123!', 10), role: 'admin' });
    await SiteSettings.create({ contactEmail: 'team@example.com', supportPhone: '+233 240 000 000', accraOfficeAddress: 'Test office address' });
    server = createApp().listen(0); await new Promise(resolve => server.once('listening', resolve));
    const base = 'http://127.0.0.1:' + server.address().port;
    let token;
    async function request(route, method = 'GET', body, authenticated = false) {
      const response = await fetch(base + '/api' + route, { method, headers: { ...(body && !(body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}), ...(authenticated ? { Authorization: 'Bearer ' + token } : {}) }, body: body ? body instanceof FormData ? body : JSON.stringify(body) : undefined });
      return { status: response.status, body: await response.json() };
    }
    let result = await request('/auth/login', 'POST', { email: 'admin@example.com', password: 'TestPassword123!' });
    assert.equal(result.status, 200); token = result.body.data.token;
    assert.equal((await request('/auth/activity', 'GET', undefined, true)).body.data.length, 1);
    assert.equal((await request('/settings')).body.data.accraOfficeAddress, 'Test office address');
    const job = { title: 'Integration Software Engineer', category: 'Software Engineering', type: 'Full-time', description: 'Build reliable software for the integration test client.', techStack: ['TypeScript'], status: 'draft' };
    result = await request('/jobs/admin', 'POST', job, true); assert.equal(result.status, 201); const jobId = result.body.data._id;
    assert.equal((await request('/jobs')).body.data.length, 0);
    result = await request('/jobs/admin/' + jobId, 'PUT', { ...job, status: 'published' }, true); assert.equal(result.status, 200);
    assert.equal((await request('/jobs')).body.data.length, 1);
    function application() {
      const form = new FormData();
      const fields = { name: 'Test Candidate', email: 'candidate@example.com', phone: '+233240000000', location: 'Accra', technologyArea: 'Client supplied category', role: 'Client supplied role', yearsExperience: '5', skills: 'TypeScript,SQL', consent: 'true', jobId };
      for (const [key,value] of Object.entries(fields)) form.append(key,value);
      form.append('cv', new Blob(['%PDF-1.4\nTemporary integration test resume.\n%%EOF'], { type: 'application/pdf' }), 'test-resume.pdf');
      return form;
    }
    result = await request('/applications', 'POST', application()); assert.equal(result.status, 201); const applicationId = result.body.data.id;
    const savedApplication = await TalentApplication.findById(applicationId).lean();
    assert.equal(savedApplication.jobId, jobId); assert.equal(savedApplication.role, job.title); assert.equal(savedApplication.technologyArea, job.category); assert.ok(savedApplication.consentAt);
    assert.equal((await fetch(base + '/api/applications/admin/' + applicationId + '/cv')).status, 401);
    const download = await fetch(base + '/api/applications/admin/' + applicationId + '/cv', { headers: { Authorization: 'Bearer ' + token } }); assert.equal(download.status, 200); assert.match(await download.text(), /Temporary integration/);
    assert.equal((await fetch(base + savedApplication.cvUrl)).status, 404);
    await request('/jobs/admin/' + jobId, 'PUT', { ...job, status: 'closed' }, true);
    assert.equal((await request('/applications', 'POST', application())).status, 409);
    assert.equal((await fs.readdir(path.join(uploadRoot, 'cvs'))).length, 1, 'Rejected applications must not retain an unused local CV');
    assert.equal((await request('/jobs')).body.data.length, 0);
    const content = { kind: 'insight', slug: 'integration-article', title: 'Integration Article', body: 'Temporary content used only for this isolated integration verification.', status: 'draft' };
    result = await request('/content/admin', 'POST', content, true); assert.equal(result.status, 201); const contentId = result.body.data._id;
    assert.equal((await request('/content/insight')).body.data.length, 0);
    await request('/content/admin/' + contentId, 'PUT', { ...content, status: 'published' }, true);
    assert.equal((await request('/content/insight')).body.data[0].slug, content.slug);
    const sitemap = await (await fetch(base + '/sitemap.xml')).text(); assert.match(sitemap, /integration-article/); assert.doesNotMatch(sitemap, /\/admin/);
    const lead = { name: 'Test Employer', company: 'Test Company', email: 'employer@example.com', technologyNeed: 'Software', role: 'Developer', numberOfProfessionals: 2, engagementType: 'Managed talent' };
    result = await request('/leads', 'POST', lead); assert.equal(result.status, 201); const leadId = result.body.data.id;
    const savedLead = await CompanyLead.findOne({ company: 'Test Company' }).lean(); assert.ok(savedLead);
    await request('/leads/admin/' + savedLead._id, 'PATCH', { status: 'Qualified', placedAt: '2026-10-01T00:00:00Z' }, true);
    assert.equal((await CompanyLead.findById(savedLead._id)).followUps.length, 3);
    assert.equal((await request('/leads/contact', 'POST', { name: 'Contact Test', email: 'contact@example.com', subject: 'Technology requirements', message: 'Please contact our team about managed delivery.' })).status, 201);
    assert.equal((await request('/newsletter/subscribe', 'POST', { email: 'newsletter@example.com' })).status, 200);
    assert.ok((await EmailNotification.countDocuments({ status: 'pending_configuration' })) >= 6);
    assert.equal((await request('/admin/communications/process', 'POST', {}, true)).body.data.configured, false);
    result = await request('/auth/profile', 'PUT', { name: 'Updated Test Administrator', email: 'admin@example.com', currentPassword: 'incorrect', newPassword: 'UpdatedPassword123!' }, true); assert.equal(result.status, 400);
    result = await request('/auth/profile', 'PUT', { name: 'Updated Test Administrator', email: 'admin@example.com', currentPassword: 'TestPassword123!', newPassword: 'UpdatedPassword123!' }, true); assert.equal(result.status, 200);
    assert.equal((await request('/auth/login', 'POST', { email: 'admin@example.com', password: 'TestPassword123!' })).status, 401);
    assert.equal((await request('/auth/login', 'POST', { email: 'admin@example.com', password: 'UpdatedPassword123!' })).status, 200);
    const currentSettings = (await request('/admin/settings', 'GET', undefined, true)).body.data;
    await request('/admin/settings', 'PUT', { ...currentSettings, contactEmail: 'updated@example.com', allowPublicApplications: false }, true);
    assert.equal((await request('/settings')).body.data.contactEmail, 'updated@example.com');
    assert.equal((await request('/applications', 'POST', application())).status, 403);
    await request('/applications/admin/' + applicationId, 'DELETE', undefined, true);
    console.log('Isolated persistence: job publishing/closing, application attribution, private CVs, content visibility, sitemap, employer/contact/newsletter submissions, follow-ups, account changes, and public settings passed.');
  } finally {
    if (server) { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
    if (mongoose.connection.name !== databaseName || !databaseName.startsWith('ghanatech_launch_test_')) throw new Error('Refusing to clean up an unexpected database.');
    await mongoose.connection.dropDatabase(); await mongoose.disconnect();
    const allowedRoot = path.resolve(__dirname, '../../.tmp');
    if (!uploadRoot.startsWith(allowedRoot + path.sep)) throw new Error('Unexpected upload directory.');
    const directory = path.join(uploadRoot, 'cvs');
    for (const filename of await fs.readdir(directory).catch(() => [])) await fs.unlink(path.join(directory, path.basename(filename)));
    await fs.rmdir(directory).catch(() => {}); await fs.rmdir(uploadRoot).catch(() => {});
  }
});
