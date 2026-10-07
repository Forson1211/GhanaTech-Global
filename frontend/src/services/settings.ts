import api from './api';
import type { ApiResponse } from '@/types/common';
export interface SiteSettings { companyName: string; tagline: string; contactEmail: string; supportPhone: string; accraOfficeAddress: string; usOfficeAddress: string; allowPublicApplications: boolean; allowLeadSubmissions: boolean; socialLinks?: Record<string, string>; }
export const settingsService = {
  async get(): Promise<ApiResponse<SiteSettings>> { return await api.get('/admin/settings') as unknown as ApiResponse<SiteSettings>; },
  async update(settings: SiteSettings): Promise<ApiResponse<SiteSettings>> { return await api.put('/admin/settings', settings) as unknown as ApiResponse<SiteSettings>; },
};
