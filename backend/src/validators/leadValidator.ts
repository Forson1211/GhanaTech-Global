import { z } from 'zod';
import { LEAD_STATUSES } from '../utils/workflow';
import { stringList, optionalDate } from './intakeFields';
export const createLeadSchema = z.object({
  name: z.string().trim().min(2, 'Contact name is required').max(200),
  company: z.string().trim().min(2, 'Company name is required').max(200),
  email: z.string().trim().email('Please provide a valid work email').max(254),
  phone: z.string().max(50).optional(),
  companySize: z.string().max(100).default('11-50'),
  technologyNeed: z.string().trim().min(2).max(200),
  role: z.string().trim().min(2, 'Target role is required').max(200),
  numberOfProfessionals: z.coerce.number().int().min(1).max(1000).default(1),
  engagementType: z.string().max(100).default('Direct placement'),
  budgetRange: z.string().max(100).optional(),
  message: z.string().max(10000).optional(),
  requiredSkills: stringList.optional(),
  experienceLevel: z.enum(['Junior', 'Mid-Level', 'Senior', 'Lead', 'Not sure']).optional(),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Project']).optional(),
  desiredStartDate: optionalDate,
  jobDescription: z.string().max(10000).optional(),
  candidateId: z.string().regex(/^[a-f0-9]{24}$/i).optional(),
  candidateName: z.string().max(200).optional(),
});
export const updateLeadSchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  internalNotes: z.string().max(20000).optional(),
  discoveryAt: z.string().datetime({ offset: true }).optional(),
  placedAt: z.string().datetime({ offset: true }).optional(),
  followUps: z.array(z.object({ day: z.union([z.literal(30), z.literal(60), z.literal(90)]), completed: z.boolean() })).max(3).optional(),
});
