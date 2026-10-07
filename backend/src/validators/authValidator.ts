import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(200).optional(),
  email: z.string().email('Please provide a valid email address').optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(12, 'Use at least 12 characters for a new password').max(200).optional(),
}).refine(value => !value.newPassword || !!value.currentPassword, { message: 'Current password is required', path: ['currentPassword'] });
