import api from './api';
import type { ApiResponse } from '@/types/common';
export interface JobPosting { _id: string; title: string; category: string; type: string; location: string; salary: string; description: string; responsibilities: string[]; requirements: string[]; techStack: string[]; status: 'draft' | 'published' | 'closed'; closesAt?: string | null; }
export interface SiteContent { _id: string; kind: 'leadership' | 'insight' | 'privacy' | 'terms'; title: string; slug: string; summary: string; body: string; imageUrl: string; author: string; order: number; status: 'draft' | 'published'; updatedAt?: string; }
export const publishingService = {
  async jobs(): Promise<ApiResponse<JobPosting[]>> { return await api.get('/jobs') as unknown as ApiResponse<JobPosting[]>; },
  async content(kind: string): Promise<ApiResponse<SiteContent[]>> { return await api.get('/content/' + kind) as unknown as ApiResponse<SiteContent[]>; },
  async list(resource: 'jobs' | 'content'): Promise<ApiResponse<(JobPosting | SiteContent)[]>> { return await api.get('/' + resource + '/admin/all') as unknown as ApiResponse<(JobPosting | SiteContent)[]>; },
  async save(resource: 'jobs' | 'content', value: object, id?: string) { return id ? api.put('/' + resource + '/admin/' + id, value) : api.post('/' + resource + '/admin', value); },
  async remove(resource: 'jobs' | 'content', id: string) { return api.delete('/' + resource + '/admin/' + id); },
};
