import api from './api';
import type { TalentApplication, ApplicationStatus } from '@/types/candidate';
import type { ApiResponse } from '@/types/common';

export const applicationService = {
  // Public application submission with CV file upload
  async submitApplication(formData: FormData): Promise<ApiResponse<TalentApplication>> {
    return (api.post('/applications', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }) as unknown) as ApiResponse<TalentApplication>;
  },

  // Admin application management
  async getApplications(params: { page?: number; limit?: number; search?: string; status?: string; role?: string } = {}): Promise<ApiResponse<{ applications: TalentApplication[]; total: number; page: number; totalPages: number }>> {
    return (api.get('/admin/applications', { params }) as unknown) as ApiResponse<{ applications: TalentApplication[]; total: number; page: number; totalPages: number }>;
  },

  async getApplicationById(id: string): Promise<ApiResponse<TalentApplication>> {
    return (api.get(`/admin/applications/${id}`) as unknown) as ApiResponse<TalentApplication>;
  },

  async updateApplicationStatus(id: string, status: ApplicationStatus): Promise<ApiResponse<TalentApplication>> {
    return (api.patch(`/admin/applications/${id}/status`, { status }) as unknown) as ApiResponse<TalentApplication>;
  },

  async updateApplicationNotes(id: string, internalNotes: string): Promise<ApiResponse<TalentApplication>> {
    return (api.patch(`/admin/applications/${id}/notes`, { internalNotes }) as unknown) as ApiResponse<TalentApplication>;
  },

  async deleteApplication(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/admin/applications/${id}`) as unknown) as ApiResponse<null>;
  },

  getCVDownloadUrl(id: string): string {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    return `${base}/admin/applications/${id}/cv`;
  }
};
