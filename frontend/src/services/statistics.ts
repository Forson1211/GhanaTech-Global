import api from './api';
import type { StatisticItem, ApiResponse } from '@/types/common';

export interface AdminDashboardStats {
  totalCandidates: number;
  newApplications: number;
  openLeads: number;
  activeServices: number;
  candidateStatusBreakdown: { status: string; count: number }[];
  leadStatusBreakdown: { status: string; count: number }[];
  recentApplications: any[];
  recentLeads: any[];
}

export const statisticsService = {
  // Public trust numbers
  async getPublicStatistics(signal?: AbortSignal): Promise<ApiResponse<StatisticItem[]>> {
    const response = await api.get<ApiResponse<StatisticItem[]>>('/statistics', { signal, timeout: 10000 });
    return response.data;
  },

  // Admin stats
  async getAllStatistics(): Promise<ApiResponse<StatisticItem[]>> {
    return (api.get('/admin/statistics') as unknown) as ApiResponse<StatisticItem[]>;
  },

  async updateStatistic(id: string, data: Partial<StatisticItem>): Promise<ApiResponse<StatisticItem>> {
    return (api.put(`/admin/statistics/${id}`, data) as unknown) as ApiResponse<StatisticItem>;
  },

  async getAdminDashboardMetrics(): Promise<ApiResponse<AdminDashboardStats>> {
    return (api.get('/admin/overview-metrics') as unknown) as ApiResponse<AdminDashboardStats>;
  },
};
