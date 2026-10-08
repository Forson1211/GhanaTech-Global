const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { CalculatorConfig } = require('../dist/models/CalculatorConfig');
const { calculateEstimate } = require('../dist/controllers/calculatorController');
const original = CalculatorConfig.findOne;
after(() => { CalculatorConfig.findOne = original; });
function response() { return { code: 200, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } }; }

test('invalid calculator requests fail before accessing the database', async () => {
  CalculatorConfig.findOne = () => { throw new Error('Unexpected database access'); };
  for (const body of [{ role: {} }, { role: 'Engineer', count: 1.5 }, { role: 'Engineer', count: 'Infinity' }, { role: 'Engineer', count: 0 }, { role: 'Engineer', seniority: 'invalid' }]) {
    const res = response(); await calculateEstimate({ body }, res);
    assert.equal(res.code, 400); assert.equal(res.body.success, false);
  }
});

test('role names containing regex characters match literally and use configured costs', async () => {
  let query;
  CalculatorConfig.findOne = value => { query = value; return { lean: async () => ({ usEstimatedAnnualCost: 150000, ghanaTechEstimatedAnnualCost: 0 }) }; };
  const res = response(); await calculateEstimate({ body: { role: 'C++ Developer', seniority: 'Senior', count: 2 } }, res);
  assert.equal(query.role.$regex.test('C++ Developer'), true);
  assert.equal(query.role.$regex.test('CCCC Developer'), false);
  assert.equal(res.body.data.estimatedUsCost, 300000);
  assert.equal(res.body.data.estimatedGhanaTechCost, 0);
});
