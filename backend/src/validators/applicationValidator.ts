import { z } from 'zod';
import { APPLICATION_STATUSES } from '../utils/workflow';
import { stringList, optionalUrl } from './intakeFields';

export const createApplicationSchema = z.object({
  name: z.string().trim().min(2, 'Full name is required').max(200),
  firstName: z.string().trim().min(1).max(100).optional(),
  lastName: z.string().trim().min(1).max(100).optional(),
  employmentStatus: z.enum(['Employed', 'Self-employed', 'Seeking opportunities', 'Student']).optional(),
  education: z.string().max(2000).optional(),
  certifications: stringList.optional(),
  employmentPreferences: stringList.pipe(z.array(z.enum(['Full-time', 'Contract', 'Project', 'Managed team', 'Part-time'])).min(1)).optional(),
  consent: z.union([z.literal(true), z.literal('true')]).transform(() => true),
  email: z.string().email('Please provide a valid email address').trim(),
  phone: z.string().min(7, 'Phone number is required').trim(),
  location: z.string().min(2, 'Location is required').trim(),
  technologyArea: z.string().min(2, 'Primary technology area is required').trim(),
  role: z.string().min(2, 'Primary role is required').trim(),
  jobId: z.string().regex(/^[a-f0-9]{24}$/i).optional(),
  yearsExperience: z.coerce.number().min(0, 'Years of experience cannot be negative'),
  skills: stringList.pipe(z.array(z.string()).min(1, 'Provide at least one skill')),
  linkedin: optionalUrl,
  github: optionalUrl,
  portfolio: optionalUrl,
  availability: z.string().default('Available Immediately'),
  desiredEngagement: z.string().default('Full-time Remote'),
  cvToken: z.string().max(4096).optional(),
});

export const updateApplicationSchema = z.object({
  status: z.enum(APPLICATION_STATUSES).optional(),
  internalNotes: z.string().optional(),
});
