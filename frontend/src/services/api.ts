import axios from 'axios';

// Production always shares the website origin; development may use a separate API.
export const API_BASE_URL = import.meta.env.PROD ? '/api' : (import.meta.env.VITE_API_URL || '/api');
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For httpOnly cookies
});

// Request interceptor to attach JWT token if saved in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gtg_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors uniformly
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // If unauthorized on admin page, remove stale auth
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin') && currentPath !== '/admin/login') {
        localStorage.removeItem('gtg_token');
        localStorage.removeItem('gtg_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
