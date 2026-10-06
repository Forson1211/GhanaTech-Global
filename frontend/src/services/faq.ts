import api from './api';
import type { FAQItem, ApiResponse } from '@/types/common';

export const faqService = {
  // Public
  async getFaqs(): Promise<ApiResponse<FAQItem[]>> {
    return (api.get('/faqs') as unknown) as ApiResponse<FAQItem[]>;
  },

  // Admin
  async getAllFaqs(): Promise<ApiResponse<FAQItem[]>> {
    return (api.get('/admin/faqs') as unknown) as ApiResponse<FAQItem[]>;
  },

  async createFaq(data: Partial<FAQItem>): Promise<ApiResponse<FAQItem>> {
    return (api.post('/admin/faqs', data) as unknown) as ApiResponse<FAQItem>;
  },

  async updateFaq(id: string, data: Partial<FAQItem>): Promise<ApiResponse<FAQItem>> {
    return (api.put(`/admin/faqs/${id}`, data) as unknown) as ApiResponse<FAQItem>;
  },

  async deleteFaq(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/admin/faqs/${id}`) as unknown) as ApiResponse<null>;
  },

  async togglePublish(id: string, isPublished: boolean): Promise<ApiResponse<FAQItem>> {
    return (api.patch(`/admin/faqs/${id}/publish`, { isPublished }) as unknown) as ApiResponse<FAQItem>;
  },

  async reorderFaqs(faqOrders: { id: string; order: number }[]): Promise<ApiResponse<FAQItem[]>> {
    return (api.post('/admin/faqs/reorder', { faqOrders }) as unknown) as ApiResponse<FAQItem[]>;
  },
};
