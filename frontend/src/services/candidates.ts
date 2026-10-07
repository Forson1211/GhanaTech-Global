import api from './api';
import type { PublicCandidate, AdminCandidate, CandidateStatus, CandidateAvailability, AssessmentStatus } from '@/types/candidate';
import type { ApiResponse } from '@/types/common';

export interface CandidateFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  role?: string;
  skills?: string;
  minExperience?: number;
  availability?: string;
  status?: string;
}

export const candidateService = {
  // Public APIs
  async getPublicCandidates(params: CandidateFilterParams = {}): Promise<ApiResponse<{ candidates: PublicCandidate[]; total: number; page: number; totalPages: number }>> {
    const query = { ...params, profileStatus: params.status, experience: params.minExperience === undefined ? undefined : String(params.minExperience) };
    const result = await api.get('/candidates', { params: query }) as unknown as ApiResponse<{ candidates: PublicCandidate[]; pagination: { total: number; page: number; pages: number } }>;
    if (!result.data) return result as unknown as ApiResponse<{ candidates: PublicCandidate[]; total: number; page: number; totalPages: number }>;
    return { ...result, data: { candidates: result.data.candidates, total: result.data.pagination.total, page: result.data.pagination.page, totalPages: result.data.pagination.pages } };
  },

  async getPublicCandidateById(id: string): Promise<ApiResponse<PublicCandidate>> {
    return (api.get(`/candidates/${id}`) as unknown) as ApiResponse<PublicCandidate>;
  },

  async getFeaturedCandidates(): Promise<ApiResponse<PublicCandidate[]>> {
    const result = await this.getPublicCandidates({ limit: 6, availability: 'Available' });
    return { ...result, data: result.data?.candidates || [] };
  },

  // Admin APIs
  async getAdminCandidates(params: CandidateFilterParams = {}): Promise<ApiResponse<{ candidates: AdminCandidate[]; total: number; page: number; totalPages: number }>> {
    const query = { ...params, profileStatus: params.status, experience: params.minExperience === undefined ? undefined : String(params.minExperience) };
    const result = await api.get('/candidates/admin/all', { params: query }) as unknown as ApiResponse<{ candidates: AdminCandidate[]; pagination: { total: number; page: number; pages: number } }>;
    if (!result.data) return result as unknown as ApiResponse<{ candidates: AdminCandidate[]; total: number; page: number; totalPages: number }>;
    return { ...result, data: { candidates: result.data.candidates, total: result.data.pagination.total, page: result.data.pagination.page, totalPages: result.data.pagination.pages } };
  },

  async getAdminCandidateById(id: string): Promise<ApiResponse<AdminCandidate>> {
    return (api.get(`/candidates/admin/${id}`) as unknown) as ApiResponse<AdminCandidate>;
  },

  async createCandidate(payload: Partial<AdminCandidate>): Promise<ApiResponse<AdminCandidate>> {
    return (api.post('/candidates/admin', payload) as unknown) as ApiResponse<AdminCandidate>;
  },

  async updateCandidate(id: string, payload: Partial<AdminCandidate>): Promise<ApiResponse<AdminCandidate>> {
    return (api.put(`/candidates/admin/${id}`, payload) as unknown) as ApiResponse<AdminCandidate>;
  },

  async deleteCandidate(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/candidates/admin/${id}`) as unknown) as ApiResponse<null>;
  },

  async updateCandidateStatus(id: string, profileStatus: CandidateStatus): Promise<ApiResponse<AdminCandidate>> {
    return (api.patch(`/candidates/admin/${id}/status`, { profileStatus }) as unknown) as ApiResponse<AdminCandidate>;
  },

  async updateCandidateAvailability(id: string, availability: CandidateAvailability): Promise<ApiResponse<AdminCandidate>> {
    return (api.patch(`/candidates/admin/${id}/status`, { availability }) as unknown) as ApiResponse<AdminCandidate>;
  },

  async updateCandidateAssessment(id: string, assessmentStatus: AssessmentStatus): Promise<ApiResponse<AdminCandidate>> {
    return (api.patch(`/candidates/admin/${id}/status`, { assessmentStatus }) as unknown) as ApiResponse<AdminCandidate>;
  },
};
