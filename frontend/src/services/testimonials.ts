import api from './api';
import type { TestimonialItem, ApiResponse } from '@/types/common';

export const testimonialService = {
  // Public
  async getTestimonials(): Promise<ApiResponse<TestimonialItem[]>> {
    return (api.get('/testimonials') as unknown) as ApiResponse<TestimonialItem[]>;
  },

  // Admin
  async getAllTestimonials(): Promise<ApiResponse<TestimonialItem[]>> {
    return (api.get('/testimonials/admin/all') as unknown) as ApiResponse<TestimonialItem[]>;
  },

  async createTestimonial(data: Partial<TestimonialItem>): Promise<ApiResponse<TestimonialItem>> {
    return (api.post('/testimonials/admin', data) as unknown) as ApiResponse<TestimonialItem>;
  },

  async updateTestimonial(id: string, data: Partial<TestimonialItem>): Promise<ApiResponse<TestimonialItem>> {
    return (api.put(`/testimonials/admin/${id}`, data) as unknown) as ApiResponse<TestimonialItem>;
  },

  async deleteTestimonial(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/testimonials/admin/${id}`) as unknown) as ApiResponse<null>;
  },

  async togglePublish(id: string, status: 'published' | 'draft'): Promise<ApiResponse<TestimonialItem>> {
    return (api.put(`/testimonials/admin/${id}`, { status }) as unknown) as ApiResponse<TestimonialItem>;
  },
};
