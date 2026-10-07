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
    return (api.get('/services/admin/all') as unknown) as ApiResponse<ServiceItem[]>;
  },

  async createService(data: Partial<ServiceItem>): Promise<ApiResponse<ServiceItem>> {
    return (api.post('/services/admin', data) as unknown) as ApiResponse<ServiceItem>;
  },

  async updateService(id: string, data: Partial<ServiceItem>): Promise<ApiResponse<ServiceItem>> {
    return (api.put(`/services/admin/${id}`, data) as unknown) as ApiResponse<ServiceItem>;
  },

  async deleteService(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/services/admin/${id}`) as unknown) as ApiResponse<null>;
  },

  // Admin Categories
  async getAdminCategories(): Promise<ApiResponse<TechnologyCategory[]>> {
    return (api.get('/categories/admin/all') as unknown) as ApiResponse<TechnologyCategory[]>;
  },

  async createCategory(data: Partial<TechnologyCategory>): Promise<ApiResponse<TechnologyCategory>> {
    return (api.post('/categories/admin/all', data) as unknown) as ApiResponse<TechnologyCategory>;
  },

  async updateCategory(id: string, data: Partial<TechnologyCategory>): Promise<ApiResponse<TechnologyCategory>> {
    return (api.put(`/categories/admin/${id}`, data) as unknown) as ApiResponse<TechnologyCategory>;
  },

  async deleteCategory(id: string): Promise<ApiResponse<null>> {
    return (api.delete(`/categories/admin/${id}`) as unknown) as ApiResponse<null>;
  },
};
