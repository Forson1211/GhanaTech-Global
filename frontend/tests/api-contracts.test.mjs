import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
let calls = [], response;
globalThis.__contractApi = Object.fromEntries(['get', 'post', 'put', 'patch', 'delete'].map(method => [method, async (...args) => { calls.push([method, ...args]); return response; }]));
async function service(name) {
  const source = readFileSync(new URL(`../src/services/${name}.ts`, import.meta.url), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText.replace(/import api[^;]*;/, 'const api = globalThis.__contractApi;');
  return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
}

test('admin leads use protected backend routes and expose the backend pagination', async () => {
  calls = []; const { leadService } = await service('leads');
  response = { success: true, data: { leads: [{ company: 'Example' }], pagination: { total: 21, page: 2, pages: 3 } } };
  const result = await leadService.getLeads({ page: 2 });
  assert.deepEqual(calls[0], ['get', '/leads/admin/all', { params: { page: 2 } }]); assert.equal(result.data.total, 21); assert.equal(result.data.totalPages, 3);
  await leadService.updateLeadStatus('id', 'Discovery Scheduled'); assert.deepEqual(calls.at(-1), ['patch', '/leads/admin/id', { status: 'Discovery Scheduled' }]);
  await leadService.updateLeadNotes('id', 'Follow up'); assert.deepEqual(calls.at(-1), ['patch', '/leads/admin/id', { internalNotes: 'Follow up' }]);
});

test('candidate directory normalizes pagination and uses the shared status endpoint', async () => {
  calls = []; const { candidateService } = await service('candidates');
  response = { success: true, data: { candidates: [], pagination: { total: 0, page: 1, pages: 1 } } };
  assert.equal((await candidateService.getAdminCandidates({ status: 'Pending' })).data.total, 0); assert.equal(calls[0][1], '/candidates/admin/all'); assert.equal(calls[0][2].params.profileStatus, 'Pending');
  await candidateService.updateCandidateAvailability('id', 'Available'); assert.deepEqual(calls.at(-1), ['patch', '/candidates/admin/id/status', { availability: 'Available' }]);
  await candidateService.updateCandidateAssessment('id', 'Screening'); assert.equal(calls.at(-1)[1], '/candidates/admin/id/status');
});

test('calculator translates backend estimates and persists configurations using its existing API', async () => {
  calls = []; const { calculatorService } = await service('calculator');
  response = { success: true, data: { role: 'Engineer', seniority: 'Senior', count: 2, unitUsCost: 150000, unitGhanaTechCost: 50000, estimatedUsCost: 300000, estimatedGhanaTechCost: 100000, estimatedAnnualDifference: 200000, estimatedPercentageDifference: 67 } };
  const result = await calculatorService.calculate('Engineer', 'Senior', 2); assert.equal(result.data.annualSavings, 200000); assert.equal(result.data.totalGhanaTechCost, 100000);
  await calculatorService.updateConfiguration('id', { role: 'Engineer', seniority: 'Senior' }); assert.deepEqual(calls.at(-1), ['put', '/calculator/admin/config/id', { role: 'Engineer', seniority: 'Senior' }]);
});

test('statistics are unwrapped once and auth verification uses the existing authenticated account route', async () => {
  calls = []; const { statisticsService } = await service('statistics');
  response = { success: true, data: [{ label: 'Talent', value: '0' }] };
  assert.deepEqual(await statisticsService.getPublicStatistics(), response);
  const { authService } = await service('auth'); response = { success: true, data: { name: 'Admin', role: 'admin' } };
  const result = await authService.verifyToken(); assert.equal(calls.at(-1)[1], '/auth/me'); assert.equal(result.data.valid, true); assert.equal(result.data.user.name, 'Admin');
});

test('content publishing and ordering reach supported backend routes', async () => {
  calls = []; response = { success: true, data: [] };
  const { servicesService } = await service('services'); await servicesService.getAdminServices(); assert.equal(calls.at(-1)[1], '/services/admin/all'); await servicesService.getAdminCategories(); assert.equal(calls.at(-1)[1], '/categories/admin/all');
  const { faqService } = await service('faq'); await faqService.togglePublish('id', false); assert.deepEqual(calls.at(-1), ['put', '/faqs/admin/id', { isPublished: false }]); await faqService.reorderFaqs([{ id: 'id', order: 2 }]); assert.deepEqual(calls.at(-1), ['post', '/faqs/admin/reorder', { items: [{ id: 'id', order: 2 }] }]);
  const { testimonialService } = await service('testimonials'); await testimonialService.togglePublish('id', 'draft'); assert.deepEqual(calls.at(-1), ['put', '/testimonials/admin/id', { status: 'draft' }]);
});
