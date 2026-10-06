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
    return (api.get('/candidates', { params }) as unknown) as ApiResponse<{ candidates: PublicCandidate[]; total: number; page: number; totalPages: number }>;
  },

  async getPublicCandidateById(id: string): Promise<ApiResponse<PublicCandidate>> {
    return (api.get(`/candidates/${id}`) as unknown) as ApiResponse<PublicCandidate>;
  },

  async getFeaturedCandidates(): Promise<ApiResponse<PublicCandidate[]>> {
    return (api.get('/candidates/featured') as unknown) as ApiResponse<PublicCandidate[]>;
  },

  // Admin APIs
  async getAdminCandidates(params: CandidateFilterParams = {}): Promise<ApiResponse<{ candidates: AdminCandidate[]; total: number; page: number; totalPages: number }>> {
    return (api.get('/admin/candidates', { params }) as unknown) as ApiResponse<{ candidates: AdminCandidate[]; total: number; page: number; totalPages: number }>;
  },

  async getAdminCandidateById(id: string): Promise<ApiResponse<AdminCandidate>> {
    return (api.get(`/admin/candidates/${id}`) as unknown) as ApiResponse<AdminCandidate>;
  },

  async createCandidate(payload: Partial<AdminCandidate>): Promise<ApiResponse<AdminCandidate>> {
    return (api.post('/admin/candidates', payload) as unknown) as ApiResponse<AdminCandidate>;
  },

  async updateCandidate(id: string, payload: Partial<AdminCandidate>): Promise<ApiResponse<AdminCandidate>> {
    return (api.put(`/admin/candidates/${id}`, payload) as unknown) as ApiResponse<AdminCandidate>;
  },

  async deleteCandidate(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/admin/candidates/${id}`) as unknown) as ApiResponse<null>;
  },

  async updateCandidateStatus(id: string, profileStatus: CandidateStatus): Promise<ApiResponse<AdminCandidate>> {
    return (api.patch(`/admin/candidates/${id}/status`, { profileStatus }) as unknown) as ApiResponse<AdminCandidate>;
  },

  async updateCandidateAvailability(id: string, availability: CandidateAvailability): Promise<ApiResponse<AdminCandidate>> {
    return (api.patch(`/admin/candidates/${id}/availability`, { availability }) as unknown) as ApiResponse<AdminCandidate>;
  },

  async updateCandidateAssessment(id: string, assessmentStatus: AssessmentStatus): Promise<ApiResponse<AdminCandidate>> {
    return (api.patch(`/admin/candidates/${id}/assessment`, { assessmentStatus }) as unknown) as ApiResponse<AdminCandidate>;
  },
};
