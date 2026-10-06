import { upload } from '@vercel/blob/client';
import api, { API_BASE_URL } from './api';
import type { TalentApplication, ApplicationStatus } from '@/types/candidate';
import type { ApiResponse } from '@/types/common';

const uploadedFiles = new WeakMap<File, { token: string; expires: number }>();

export const applicationService = {
  async submitApplication(formData: FormData): Promise<ApiResponse<TalentApplication>> {
    const file = formData.get('cv');
    if (file instanceof File && file.size) {
      if (!/\.(pdf|doc|docx)$/i.test(file.name) || file.size > 10 * 1024 * 1024) {
        throw new Error('Choose a PDF, DOC or DOCX document up to 10 MB.');
      }
      const config = await api.get('/applications/upload-config') as unknown as ApiResponse<{ directUpload: boolean }>;
      if (config.data?.directUpload) {
        let uploaded = uploadedFiles.get(file);
        if (!uploaded || uploaded.expires < Date.now()) {
          const authorization = await api.post('/applications/prepare-upload', {
            name: file.name, size: file.size, contentType: file.type,
          }) as unknown as ApiResponse<{ token: string; pathname: string; contentType: string }>;
          if (!authorization.success || !authorization.data) throw new Error('Could not prepare your CV upload.');
          const ticket = authorization.data;
          await upload(ticket.pathname, file, {
            access: 'private', contentType: ticket.contentType,
            handleUploadUrl: `${API_BASE_URL.replace(/\/$/, '')}/applications/upload`,
            clientPayload: ticket.token,
          });
          uploaded = { token: ticket.token, expires: Date.now() + 20 * 60 * 1000 };
          uploadedFiles.set(file, uploaded);
        }
        const payload: Record<string, string> = {};
        formData.forEach((value, key) => { if (key !== 'cv' && typeof value === 'string') payload[key] = value; });
        payload.cvToken = uploaded.token;
        return await api.post('/applications', payload) as unknown as ApiResponse<TalentApplication>;
      }
    }
    return await api.post('/applications', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }) as unknown as ApiResponse<TalentApplication>;
  },

  async getApplications(params: { page?: number; limit?: number; search?: string; status?: string; role?: string } = {}): Promise<ApiResponse<{ applications: TalentApplication[]; total: number; page: number; totalPages: number }>> {
    const result = await api.get('/applications/admin/all', { params }) as unknown as ApiResponse<{
      applications: TalentApplication[]; pagination: { total: number; page: number; pages: number };
    }>;
    if (!result.data) return result as unknown as ApiResponse<{ applications: TalentApplication[]; total: number; page: number; totalPages: number }>;
    return { ...result, data: { applications: result.data.applications, total: result.data.pagination.total, page: result.data.pagination.page, totalPages: result.data.pagination.pages } };
  },
  async getApplicationById(id: string): Promise<ApiResponse<TalentApplication>> {
    return await api.get(`/applications/admin/${id}`) as unknown as ApiResponse<TalentApplication>;
  },
  async updateApplicationStatus(id: string, status: ApplicationStatus): Promise<ApiResponse<TalentApplication>> {
    return await api.patch(`/applications/admin/${id}`, { status }) as unknown as ApiResponse<TalentApplication>;
  },
  async updateApplicationNotes(id: string, internalNotes: string): Promise<ApiResponse<TalentApplication>> {
    return await api.patch(`/applications/admin/${id}`, { internalNotes }) as unknown as ApiResponse<TalentApplication>;
  },
  async deleteApplication(id: string): Promise<ApiResponse<null>> {
    return await api.delete(`/applications/admin/${id}`) as unknown as ApiResponse<null>;
  },
  async downloadCV(id: string, filename = 'resume.pdf'): Promise<void> {
    const document = await api.get(`/applications/admin/${id}/cv`, { responseType: 'blob' }) as unknown as Blob;
    const url = URL.createObjectURL(document);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = filename;
    window.document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
};
