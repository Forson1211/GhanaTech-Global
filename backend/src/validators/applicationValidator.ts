import { z } from 'zod';

export const createApplicationSchema = z.object({
  name: z.string().min(2, 'Full name is required').trim(),
  email: z.string().email('Please provide a valid email address').trim(),
  phone: z.string().min(7, 'Phone number is required').trim(),
  location: z.string().min(2, 'Location is required').trim(),
  technologyArea: z.string().min(2, 'Primary technology area is required').trim(),
  role: z.string().min(2, 'Primary role is required').trim(),
  yearsExperience: z.coerce.number().min(0, 'Years of experience cannot be negative'),
  skills: z.union([z.array(z.string()), z.string()]).transform((val) => {
    if (Array.isArray(val)) return val;
    return val.split(',').map((s) => s.trim()).filter(Boolean);
  }),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),
  availability: z.string().default('Available Immediately'),
  desiredEngagement: z.string().default('Full-time Remote'),
  cvToken: z.string().max(4096).optional(),
});

export const updateApplicationSchema = z.object({
  status: z.enum(['New', 'Reviewing', 'Shortlisted', 'Interview', 'Accepted', 'Rejected']).optional(),
  internalNotes: z.string().optional(),
});
