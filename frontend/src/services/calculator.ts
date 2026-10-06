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
    return (api.get('/calculator/config') as unknown) as ApiResponse<CalculatorConfigItem[]>;
  },

  async calculate(role: string, seniority: string, count: number): Promise<ApiResponse<CalculationResult>> {
    return (api.post('/calculator/calculate', { role, seniority, count }) as unknown) as ApiResponse<CalculationResult>;
  },

  // Admin
  async getAllConfigurations(): Promise<ApiResponse<CalculatorConfigItem[]>> {
    return (api.get('/admin/calculator') as unknown) as ApiResponse<CalculatorConfigItem[]>;
  },

  async updateConfiguration(id: string, data: Partial<CalculatorConfigItem>): Promise<ApiResponse<CalculatorConfigItem>> {
    return (api.put(`/admin/calculator/${id}`, data) as unknown) as ApiResponse<CalculatorConfigItem>;
  },

  async createConfiguration(data: Partial<CalculatorConfigItem>): Promise<ApiResponse<CalculatorConfigItem>> {
    return (api.post('/admin/calculator', data) as unknown) as ApiResponse<CalculatorConfigItem>;
  },

  async deleteConfiguration(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/admin/calculator/${id}`) as unknown) as ApiResponse<null>;
  },
};
