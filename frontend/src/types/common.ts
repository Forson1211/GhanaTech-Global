export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface FAQItem {
  _id?: string;
  id?: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  isPublished: boolean;
  createdAt?: string;
}

export interface TestimonialItem {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  photo?: string;
  rating?: number;
  status: 'published' | 'draft';
  isPublished?: boolean;
}

export interface StatisticItem {
  _id?: string;
  id?: string;
  key: string;
  value: string;
  label: string;
  description?: string;
  order: number;
  isPublished: boolean;
}

export interface CalculatorConfigItem {
  _id?: string;
  id?: string;
  role: string;
  seniority: 'Junior' | 'Mid-Level' | 'Senior';
  usEstimatedAnnualCost: number;
  ghanaTechEstimatedAnnualCost: number;
  notes?: string;
}
