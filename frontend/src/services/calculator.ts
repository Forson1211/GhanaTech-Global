import api from './api';
import type { CalculatorConfigItem, ApiResponse } from '@/types/common';

export interface CalculationResult {
  role: string;
  seniority: string;
  count: number;
  usCostPerPerson: number;
  ghanaTechCostPerPerson: number;
  totalUsCost: number;
  totalGhanaTechCost: number;
  annualSavings: number;
  savingsPercentage: number;
}

export const calculatorService = {
  // Public
  async getConfigurations(): Promise<ApiResponse<CalculatorConfigItem[]>> {
    return (api.get('/calculator/configs') as unknown) as ApiResponse<CalculatorConfigItem[]>;
  },

  async calculate(role: string, seniority: string, count: number): Promise<ApiResponse<CalculationResult>> {
    const result = await api.post('/calculator/calculate', { role, seniority, count }) as unknown as ApiResponse<{ role: string; seniority: string; count: number; unitUsCost: number; unitGhanaTechCost: number; estimatedUsCost: number; estimatedGhanaTechCost: number; estimatedAnnualDifference: number; estimatedPercentageDifference: number }>;
    if (!result.data) return result as unknown as ApiResponse<CalculationResult>;
    const value = result.data;
    return { ...result, data: { role: value.role, seniority: value.seniority, count: value.count, usCostPerPerson: value.unitUsCost, ghanaTechCostPerPerson: value.unitGhanaTechCost, totalUsCost: value.estimatedUsCost, totalGhanaTechCost: value.estimatedGhanaTechCost, annualSavings: value.estimatedAnnualDifference, savingsPercentage: value.estimatedPercentageDifference } };
  },

  // Admin
  async getAllConfigurations(): Promise<ApiResponse<CalculatorConfigItem[]>> {
    return (api.get('/calculator/configs') as unknown) as ApiResponse<CalculatorConfigItem[]>;
  },

  async updateConfiguration(id: string, data: Partial<CalculatorConfigItem>): Promise<ApiResponse<CalculatorConfigItem>> {
    return (api.put(`/calculator/admin/config/${id}`, data) as unknown) as ApiResponse<CalculatorConfigItem>;
  },

  async createConfiguration(data: Partial<CalculatorConfigItem>): Promise<ApiResponse<CalculatorConfigItem>> {
    return (api.post('/calculator/admin/config', data) as unknown) as ApiResponse<CalculatorConfigItem>;
  },

  async deleteConfiguration(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/calculator/admin/config/${id}`) as unknown) as ApiResponse<null>;
  },
};
