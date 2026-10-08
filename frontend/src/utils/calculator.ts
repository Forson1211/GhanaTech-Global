import type { CalculatorConfigItem } from '@/types/common';

export function calculateCosts(configs: CalculatorConfigItem[], role: string, seniority: CalculatorConfigItem['seniority'], count: number) {
  const config = configs.find(item => item.role.toLowerCase() === role.trim().toLowerCase() && item.seniority === seniority);
  const defaults = { Junior: [95000, 32000], 'Mid-Level': [145000, 48000], Senior: [185000, 64000] };
  const [us, ghana] = defaults[seniority];
  const estimatedUsCost = (config?.usEstimatedAnnualCost ?? us) * count;
  const estimatedGhanaTechCost = (config?.ghanaTechEstimatedAnnualCost ?? ghana) * count;
  const annualDifference = estimatedUsCost - estimatedGhanaTechCost;
  return { estimatedUsCost, estimatedGhanaTechCost, annualDifference, percentageDifference: Math.round(annualDifference / estimatedUsCost * 100) };
}
