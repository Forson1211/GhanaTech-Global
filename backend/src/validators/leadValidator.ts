import { z } from 'zod';

export const createLeadSchema = z.object({
  name: z.string().min(2, 'Contact name is required').trim(),
  company: z.string().min(2, 'Company name is required').trim(),
  email: z.string().email('Please provide a valid work email').trim(),
  phone: z.string().optional(),
  companySize: z.string().default('11-50'),
  technologyNeed: z.string().min(2, 'Technology need is required').trim(),
  role: z.string().min(2, 'Target role is required').trim(),
  numberOfProfessionals: z.coerce.number().min(1, 'Number of professionals must be at least 1').default(1),
  engagementType: z.string().default('Full-Time Dedicated'),
  budgetRange: z.string().default('$30k - $50k/yr'),
  message: z.string().optional(),
});

export const updateLeadSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Qualified', 'Proposal', 'Closed', 'Rejected']).optional(),
  internalNotes: z.string().optional(),
});
