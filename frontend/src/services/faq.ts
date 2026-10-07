import api from './api';
import type { FAQItem, ApiResponse } from '@/types/common';

export const faqService = {
  // Public
  async getFaqs(): Promise<ApiResponse<FAQItem[]>> {
    return (api.get('/faqs') as unknown) as ApiResponse<FAQItem[]>;
  },

  // Admin
  async getAllFaqs(): Promise<ApiResponse<FAQItem[]>> {
    return (api.get('/faqs/admin/all') as unknown) as ApiResponse<FAQItem[]>;
  },

  async createFaq(data: Partial<FAQItem>): Promise<ApiResponse<FAQItem>> {
    return (api.post('/faqs/admin', data) as unknown) as ApiResponse<FAQItem>;
  },

  async updateFaq(id: string, data: Partial<FAQItem>): Promise<ApiResponse<FAQItem>> {
    return (api.put(`/faqs/admin/${id}`, data) as unknown) as ApiResponse<FAQItem>;
  },

  async deleteFaq(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/faqs/admin/${id}`) as unknown) as ApiResponse<null>;
  },

  async togglePublish(id: string, isPublished: boolean): Promise<ApiResponse<FAQItem>> {
    return (api.put(`/faqs/admin/${id}`, { isPublished }) as unknown) as ApiResponse<FAQItem>;
  },

  async reorderFaqs(faqOrders: { id: string; order: number }[]): Promise<ApiResponse<FAQItem[]>> {
    return (api.post('/faqs/admin/reorder', { items: faqOrders }) as unknown) as ApiResponse<FAQItem[]>;
  },
};
