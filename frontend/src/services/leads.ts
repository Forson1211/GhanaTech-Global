import api from './api';
import type { CompanyLead, HireTalentFormPayload, LeadStatus } from '@/types/lead';
import type { ApiResponse } from '@/types/common';

export const leadService = {
  // Public lead submission
  async submitHireLead(payload: HireTalentFormPayload): Promise<ApiResponse<CompanyLead>> {
    return (api.post('/leads', payload) as unknown) as ApiResponse<CompanyLead>;
  },

  async submitContact(payload: { name: string; email: string; subject: string; message: string }): Promise<ApiResponse<{ id: string }>> {
    return await api.post('/leads/contact', payload) as unknown as ApiResponse<{ id: string }>;
  },

  // Admin lead management
  async getLeads(params: { page?: number; limit?: number; search?: string; status?: string } = {}): Promise<ApiResponse<{ leads: CompanyLead[]; total: number; page: number; totalPages: number }>> {
    const result = await api.get('/leads/admin/all', { params }) as unknown as ApiResponse<{ leads: CompanyLead[]; pagination: { total: number; page: number; pages: number } }>;
    if (!result.data) return result as unknown as ApiResponse<{ leads: CompanyLead[]; total: number; page: number; totalPages: number }>;
    return { ...result, data: { leads: result.data.leads, total: result.data.pagination.total, page: result.data.pagination.page, totalPages: result.data.pagination.pages } };
  },

  async getLeadById(id: string): Promise<ApiResponse<CompanyLead>> {
    return (api.get(`/leads/admin/${id}`) as unknown) as ApiResponse<CompanyLead>;
  },

  async updateLeadStatus(id: string, status: LeadStatus): Promise<ApiResponse<CompanyLead>> {
    return (api.patch(`/leads/admin/${id}`, { status }) as unknown) as ApiResponse<CompanyLead>;
  },

  async updateLeadWorkflow(id: string, data: { internalNotes?: string; discoveryAt?: string; placedAt?: string; followUps?: { day: 30 | 60 | 90; completed: boolean }[] }): Promise<ApiResponse<CompanyLead>> {
    return await api.patch(`/leads/admin/${id}`, data) as unknown as ApiResponse<CompanyLead>;
  },

  async updateLeadNotes(id: string, internalNotes: string): Promise<ApiResponse<CompanyLead>> {
    return (api.patch(`/leads/admin/${id}`, { internalNotes }) as unknown) as ApiResponse<CompanyLead>;
  },

  async deleteLead(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/leads/admin/${id}`) as unknown) as ApiResponse<null>;
  },
};
