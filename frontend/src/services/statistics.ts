import api from './api';
import type { StatisticItem, ApiResponse } from '@/types/common';

export interface AdminDashboardStats {
  cards: {
    totalCandidates: number;
    approvedCandidates: number;
    pendingCandidates: number;
    totalApplications: number;
    newApplications: number;
    totalLeads: number;
    openLeads: number;
    activeServices: number;
  };
  candidatesByAvailability: { _id: string; count: number }[];
  recentApplications: import('@/types/candidate').TalentApplication[];
  recentLeads: import('@/types/lead').CompanyLead[];
}

export const statisticsService = {
  // Public trust numbers
  async getPublicStatistics(signal?: AbortSignal): Promise<ApiResponse<StatisticItem[]>> {
    return await api.get('/statistics', { signal, timeout: 10000 }) as unknown as ApiResponse<StatisticItem[]>;
  },

  // Admin stats
  async getAllStatistics(): Promise<ApiResponse<StatisticItem[]>> {
    return (api.get('/statistics/admin/all') as unknown) as ApiResponse<StatisticItem[]>;
  },

  async updateStatistic(id: string, data: Partial<StatisticItem>): Promise<ApiResponse<StatisticItem>> {
    return (api.put(`/statistics/admin/${id}`, data) as unknown) as ApiResponse<StatisticItem>;
  },

  async getAdminDashboardMetrics(): Promise<ApiResponse<AdminDashboardStats>> {
    return (api.get('/admin/dashboard-summary') as unknown) as ApiResponse<AdminDashboardStats>;
  },
};
