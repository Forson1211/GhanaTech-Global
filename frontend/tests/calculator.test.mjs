import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/utils/calculator.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { calculateCosts } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

test('calculator uses the exact seniority baseline without applying another multiplier', () => {
  const configs = [
    { role: 'Engineer', seniority: 'Junior', usEstimatedAnnualCost: 90000, ghanaTechEstimatedAnnualCost: 30000 },
    { role: 'Engineer', seniority: 'Senior', usEstimatedAnnualCost: 210000, ghanaTechEstimatedAnnualCost: 0 },
  ];
  assert.deepEqual(calculateCosts(configs, ' engineer ', 'Senior', 2), { estimatedUsCost: 420000, estimatedGhanaTechCost: 0, annualDifference: 420000, percentageDifference: 100 });
});

test('missing role or seniority uses the same standard baselines as the API', () => {
  assert.deepEqual(calculateCosts([], 'Custom Role', 'Junior', 3), { estimatedUsCost: 285000, estimatedGhanaTechCost: 96000, annualDifference: 189000, percentageDifference: 66 });
});
