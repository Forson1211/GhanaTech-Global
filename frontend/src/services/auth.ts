import api from './api';
import type { LoginCredentials, User } from '@/types/auth';
import type { ApiResponse } from '@/types/common';

export const authService = {
  async updateProfile(data: { name: string; email: string; currentPassword?: string; newPassword?: string }): Promise<ApiResponse<User>> {
    return await api.put('/auth/profile', data) as unknown as ApiResponse<User>;
  },
  async getActivity(): Promise<ApiResponse<{ _id: string; signedInAt: string; device: string }[]>> {
    return await api.get('/auth/activity') as unknown as ApiResponse<{ _id: string; signedInAt: string; device: string }[]>;
  },
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    return (api.post('/auth/login', credentials) as unknown) as ApiResponse<{ user: User; token: string }>;
  },

  async logout(): Promise<ApiResponse<null>> {
    return (api.post('/auth/logout') as unknown) as ApiResponse<null>;
  },

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    const result = await api.get('/auth/me') as unknown as ApiResponse<User>;
    return { ...result, data: { user: result.data } };
  },

  async verifyToken(): Promise<ApiResponse<{ valid: boolean; user?: User }>> {
    const result = await api.get('/auth/me') as unknown as ApiResponse<User>;
    return { ...result, data: { valid: result.success, user: result.data } };
  },
};
