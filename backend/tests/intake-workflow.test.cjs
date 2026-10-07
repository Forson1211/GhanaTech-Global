const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { createLeadSchema, updateLeadSchema } = require('../dist/validators/leadValidator');
const { createApplicationSchema, updateApplicationSchema } = require('../dist/validators/applicationValidator');
const { CompanyLead } = require('../dist/models/CompanyLead');
const { TalentApplication } = require('../dist/models/TalentApplication');
const { SiteSettings } = require('../dist/models/SiteSettings');
const { EmailNotification } = require('../dist/models/EmailNotification');
const storage = require('../dist/services/cvStorage');
const leadController = require('../dist/controllers/leadController');
const applicationController = require('../dist/controllers/applicationController');
const applicationService = require('../dist/services/applicationService');
const { placementFollowUps, OPEN_LEAD_STATUSES } = require('../dist/utils/workflow');
const originals = { leadSave: CompanyLead.prototype.save, appSave: TalentApplication.prototype.save, settings: SiteSettings.findOne, email: EmailNotification.updateOne, cv: storage.storeMultipartCv, leadFind: CompanyLead.findById, appFind: TalentApplication.findById };
after(() => { CompanyLead.prototype.save = originals.leadSave; TalentApplication.prototype.save = originals.appSave; SiteSettings.findOne = originals.settings; EmailNotification.updateOne = originals.email; storage.storeMultipartCv = originals.cv; CompanyLead.findById = originals.leadFind; TalentApplication.findById = originals.appFind; });
const leadInput = { name: 'Test Contact', company: 'Test Company', email: 'contact@example.com', technologyNeed: 'Software Engineering', role: 'Software Engineer', numberOfProfessionals: 3, requiredSkills: ['TypeScript', 'Node.js'], experienceLevel: 'Senior', employmentType: 'Full-time', engagementType: 'Managed talent', desiredStartDate: '2026-11-01', jobDescription: 'Build and maintain platform software.', candidateId: '507f1f77bcf86cd799439011' };
const applicationInput = { name: 'Test Candidate', firstName: 'Test', lastName: 'Candidate', email: 'candidate@example.com', phone: '+233240000000', location: 'Accra', technologyArea: 'Software Engineering', role: 'Software Engineer', yearsExperience: '5', skills: ' TypeScript, SQL, TypeScript ', education: 'Computer Science', certifications: 'AWS, Scrum', employmentStatus: 'Seeking opportunities', employmentPreferences: 'Full-time,Managed team', consent: 'true' };
function response() { return { code: 200, body: null, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } }; }
let savedLead, savedApplication, emails, closed = false;
function mockPersistence() {
  emails = []; closed = false;
  SiteSettings.findOne = () => ({ lean: async () => ({ contactEmail: 'advisors@example.com', allowPublicApplications: !closed, allowLeadSubmissions: !closed }) });
  EmailNotification.updateOne = async (...args) => { emails.push(args); return {}; };
  CompanyLead.prototype.save = async function () { const error = this.validateSync(); if (error) throw error; savedLead = this; return this; };
  TalentApplication.prototype.save = async function () { const error = this.validateSync(); if (error) throw error; savedApplication = this; return this; };
  storage.storeMultipartCv = async () => ({ cvUrl: 'private://resume', cvStorage: 'local', cvStorageKey: 'test-resume.pdf' });
}

test('employer requirements preserve structured fields and candidate selection', () => {
  const value = createLeadSchema.parse({ ...leadInput, status: 'Closed Won', internalNotes: 'injected' });
  assert.equal(value.numberOfProfessionals, 3); assert.equal(value.candidateId, leadInput.candidateId);
  assert.deepEqual(value.requiredSkills, leadInput.requiredSkills); assert.equal(value.status, undefined); assert.equal(value.internalNotes, undefined);
  for (const numberOfProfessionals of [0, 1.5, 1001]) assert.equal(createLeadSchema.safeParse({ ...leadInput, numberOfProfessionals }).success, false);
  assert.equal(createLeadSchema.safeParse({ ...leadInput, desiredStartDate: '2026-02-31' }).success, false);
});

test('talent consent, skills, links and preferences are validated for multipart and JSON', () => {
  const value = createApplicationSchema.parse(applicationInput);
  assert.equal(value.consent, true); assert.deepEqual(value.skills, ['TypeScript', 'SQL']); assert.deepEqual(value.certifications, ['AWS', 'Scrum']); assert.deepEqual(value.employmentPreferences, ['Full-time', 'Managed team']); assert.equal(value.yearsExperience, 5);
  for (const consent of [undefined, false, 'false', 'on', 1]) assert.equal(createApplicationSchema.safeParse({ ...applicationInput, consent }).success, false);
  assert.equal(createApplicationSchema.safeParse({ ...applicationInput, skills: ', , ' }).success, false);
  assert.equal(createApplicationSchema.safeParse({ ...applicationInput, linkedin: 'javascript:alert(1)' }).success, false);
  assert.equal(createApplicationSchema.safeParse({ ...applicationInput, employmentPreferences: 'Invalid' }).success, false);
});

test('new and legacy CRM/ATS stages remain valid without migrating existing records', () => {
  for (const status of ['Discovery Scheduled', 'Job Requirement Received', 'Candidates Presented', 'Client Interviews', 'Offer', 'Closed Won', 'Closed Lost', 'Proposal', 'Closed']) assert.equal(updateLeadSchema.safeParse({ status }).success, true);
  for (const status of ['Applied', 'Screening', 'Technical Assessment', 'Verified', 'Talent Pool', 'Presented', 'Client Interview', 'Selected', 'Placed', 'New', 'Accepted']) assert.equal(updateApplicationSchema.safeParse({ status }).success, true);
  assert.ok(OPEN_LEAD_STATUSES.includes('Client Interviews')); assert.equal(OPEN_LEAD_STATUSES.includes('Closed Won'), false);
});

test('employer and contact submissions persist before returning success and prepare confirmations', async () => {
  mockPersistence();
  let res = response(); await leadController.submitLead({ body: leadInput }, res);
  assert.equal(res.code, 201); assert.equal(savedLead.role, leadInput.role); assert.equal(savedLead.statusHistory[0].status, 'New'); assert.equal(emails.length, 2);
  assert.ok(emails.every(([, update]) => update.$setOnInsert.status === 'pending_configuration'));
  res = response(); await leadController.submitContact({ body: { name: 'Test Contact', email: 'person@example.com', subject: 'Team question', message: 'Please contact us about our requirements.' } }, res);
  assert.equal(res.code, 201); assert.equal(savedLead.source, 'contact'); assert.equal(savedLead.role, 'Team question');
  CompanyLead.prototype.save = async () => { throw new Error('Database unavailable'); };
  res = response(); await leadController.submitLead({ body: leadInput }, res); assert.equal(res.body.success, false);
});

test('talent submission records authorization server-side and requires a CV', async () => {
  mockPersistence();
  let res = response(); await applicationController.submitApplication({ body: { ...applicationInput }, file: { originalname: 'resume.pdf' } }, res);
  assert.equal(res.code, 201); assert.equal(savedApplication.status, 'Applied'); assert.ok(savedApplication.consentAt instanceof Date); assert.equal(savedApplication.consentVersion, 'talent-opportunities-v1'); assert.equal(emails.length, 2);
  res = response(); await applicationController.submitApplication({ body: { ...applicationInput } }, res); assert.equal(res.body.success, false);
  closed = true;
  res = response(); await applicationController.submitApplication({ body: { ...applicationInput } }, res); assert.equal(res.code, 403);
  res = response(); await leadController.submitLead({ body: leadInput }, res); assert.equal(res.code, 403);
});

test('workflow changes retain history and schedule 30/60/90-day placement follow-ups', async () => {
  mockPersistence();
  const lead = new CompanyLead(leadInput); CompanyLead.findById = async () => lead;
  const user = { _id: 'test-recruiter' };
  let res = response(); await leadController.updateLead({ params: { id: String(lead._id) }, user, body: { status: 'Job Requirement Received', placedAt: '2026-10-07T00:00:00.000Z' } }, res);
  assert.equal(res.code, 200); assert.equal(lead.statusHistory[0].changedBy, 'test-recruiter'); assert.deepEqual(lead.followUps.map(item => item.day), [30, 60, 90]); assert.equal(emails.length, 1);
  res = response(); await leadController.updateLead({ params: { id: String(lead._id) }, user, body: { followUps: [{ day: 30, completed: true }] } }, res);
  assert.equal(lead.followUps[0].completed, true); assert.equal(lead.statusHistory.length, 1);
  const app = new TalentApplication({ ...createApplicationSchema.parse(applicationInput), status: 'Applied' }); TalentApplication.findById = async () => app;
  await applicationService.updateApplicationStatusAndNotes(String(app._id), { status: 'Screening' }, 'test-recruiter');
  assert.equal(app.statusHistory[0].status, 'Screening'); assert.equal(app.statusHistory[0].changedBy, 'test-recruiter');
  const planned = placementFollowUps(new Date('2026-10-07T00:00:00Z')); assert.equal(planned[0].dueAt.toISOString(), '2026-11-06T00:00:00.000Z');
});

test('calculator edits preserve the selected ID when the role changes', async () => {
  const { CalculatorConfig } = require('../dist/models/CalculatorConfig');
  const { updateCalculatorConfig } = require('../dist/controllers/calculatorController');
  const original = CalculatorConfig.findByIdAndUpdate;
  let call;
  CalculatorConfig.findByIdAndUpdate = async (...args) => { call = args; return { _id: args[0], ...args[1].$set }; };
  try {
    const res = response();
    await updateCalculatorConfig({ params: { id: 'original-id' }, body: { role: 'New role', seniority: 'Senior', usEstimatedAnnualCost: 120000, ghanaTechEstimatedAnnualCost: 40000 } }, res);
    assert.equal(res.code, 200); assert.equal(call[0], 'original-id'); assert.equal(call[1].$set.role, 'New role'); assert.equal(call[2].runValidators, true);
    const invalid = response(); await updateCalculatorConfig({ params: { id: 'original-id' }, body: { role: 'New role', seniority: 'Senior', usEstimatedAnnualCost: -100, ghanaTechEstimatedAnnualCost: 40000 } }, invalid); assert.equal(invalid.code, 400);
  } finally { CalculatorConfig.findByIdAndUpdate = original; }
});
