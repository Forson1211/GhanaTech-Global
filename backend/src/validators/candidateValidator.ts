import { z } from 'zod';

export const createCandidateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().min(1, 'Last name is required').trim(),
  headline: z.string().min(3, 'Headline is required').trim(),
  location: z.string().default('Accra'),
  country: z.string().default('Ghana'),
  role: z.string().min(2, 'Role is required').trim(),
  category: z.string().min(2, 'Category is required').trim(),
  yearsExperience: z.coerce.number().min(0, 'Years of experience cannot be negative'),
  skills: z.union([z.array(z.string()), z.string()]).transform((val) => {
    if (Array.isArray(val)) return val;
    return val.split(',').map((s) => s.trim()).filter(Boolean);
  }),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  profileImage: z.string().optional(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
  availability: z.enum(['Available', 'Interviewing', 'Placed', 'Unavailable']).default('Available'),
  assessmentStatus: z.enum(['Screening', 'Technically Assessed', 'Evaluated', 'Ready for Placement']).default('Ready for Placement'),
  profileStatus: z.enum(['Pending', 'Approved', 'Rejected']).default('Approved'),
  // Private fields for admin
  email: z.string().email().optional(),
  phone: z.string().optional(),
  internalNotes: z.string().optional(),
  cvUrl: z.string().optional(),
});

export const updateCandidateSchema = createCandidateSchema.partial();

export const updateStatusSchema = z.object({
  profileStatus: z.enum(['Pending', 'Approved', 'Rejected']).optional(),
  availability: z.enum(['Available', 'Interviewing', 'Placed', 'Unavailable']).optional(),
  assessmentStatus: z.enum(['Screening', 'Technically Assessed', 'Evaluated', 'Ready for Placement']).optional(),
});
