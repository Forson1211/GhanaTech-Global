import api from './api';
import type { LoginCredentials, User } from '@/types/auth';
import type { ApiResponse } from '@/types/common';

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    return (api.post('/auth/login', credentials) as unknown) as ApiResponse<{ user: User; token: string }>;
  },

  async logout(): Promise<ApiResponse<null>> {
    return (api.post('/auth/logout') as unknown) as ApiResponse<null>;
  },

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return (api.get('/auth/me') as unknown) as ApiResponse<{ user: User }>;
  },

  async verifyToken(): Promise<ApiResponse<{ valid: boolean; user?: User }>> {
    return (api.get('/auth/verify') as unknown) as ApiResponse<{ valid: boolean; user?: User }>;
  },
};
