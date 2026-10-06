import api from './api';
import type { CompanyLead, HireTalentFormPayload, LeadStatus } from '@/types/lead';
import type { ApiResponse } from '@/types/common';

export const leadService = {
  // Public lead submission
  async submitHireLead(payload: HireTalentFormPayload): Promise<ApiResponse<CompanyLead>> {
    return (api.post('/leads', payload) as unknown) as ApiResponse<CompanyLead>;
  },

  // Admin lead management
  async getLeads(params: { page?: number; limit?: number; search?: string; status?: string } = {}): Promise<ApiResponse<{ leads: CompanyLead[]; total: number; page: number; totalPages: number }>> {
    return (api.get('/admin/leads', { params }) as unknown) as ApiResponse<{ leads: CompanyLead[]; total: number; page: number; totalPages: number }>;
  },

  async getLeadById(id: string): Promise<ApiResponse<CompanyLead>> {
    return (api.get(`/admin/leads/${id}`) as unknown) as ApiResponse<CompanyLead>;
  },

  async updateLeadStatus(id: string, status: LeadStatus): Promise<ApiResponse<CompanyLead>> {
    return (api.patch(`/admin/leads/${id}/status`, { status }) as unknown) as ApiResponse<CompanyLead>;
  },

  async updateLeadNotes(id: string, internalNotes: string): Promise<ApiResponse<CompanyLead>> {
    return (api.patch(`/admin/leads/${id}/notes`, { internalNotes }) as unknown) as ApiResponse<CompanyLead>;
  },

  async deleteLead(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/admin/leads/${id}`) as unknown) as ApiResponse<null>;
  },
};
