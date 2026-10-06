import api from './api';
import type { ServiceItem, TechnologyCategory } from '@/types/service';
import type { ApiResponse } from '@/types/common';

export const servicesService = {
  // Public
  async getServices(): Promise<ApiResponse<ServiceItem[]>> {
    return (api.get('/services') as unknown) as ApiResponse<ServiceItem[]>;
  },

  async getServiceBySlug(slug: string): Promise<ApiResponse<ServiceItem>> {
    return (api.get(`/services/${slug}`) as unknown) as ApiResponse<ServiceItem>;
  },

  async getCategories(): Promise<ApiResponse<TechnologyCategory[]>> {
    return (api.get('/categories') as unknown) as ApiResponse<TechnologyCategory[]>;
  },

  // Admin Services
  async getAdminServices(): Promise<ApiResponse<ServiceItem[]>> {
    return (api.get('/admin/services') as unknown) as ApiResponse<ServiceItem[]>;
  },

  async createService(data: Partial<ServiceItem>): Promise<ApiResponse<ServiceItem>> {
    return (api.post('/admin/services', data) as unknown) as ApiResponse<ServiceItem>;
  },

  async updateService(id: string, data: Partial<ServiceItem>): Promise<ApiResponse<ServiceItem>> {
    return (api.put(`/admin/services/${id}`, data) as unknown) as ApiResponse<ServiceItem>;
  },

  async deleteService(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/admin/services/${id}`) as unknown) as ApiResponse<null>;
  },

  // Admin Categories
  async getAdminCategories(): Promise<ApiResponse<TechnologyCategory[]>> {
    return (api.get('/admin/categories') as unknown) as ApiResponse<TechnologyCategory[]>;
  },

  async createCategory(data: Partial<TechnologyCategory>): Promise<ApiResponse<TechnologyCategory>> {
    return (api.post('/admin/categories', data) as unknown) as ApiResponse<TechnologyCategory>;
  },

  async updateCategory(id: string, data: Partial<TechnologyCategory>): Promise<ApiResponse<TechnologyCategory>> {
    return (api.put(`/admin/categories/${id}`, data) as unknown) as ApiResponse<TechnologyCategory>;
  },

  async deleteCategory(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/admin/categories/${id}`) as unknown) as ApiResponse<null>;
  },
};
