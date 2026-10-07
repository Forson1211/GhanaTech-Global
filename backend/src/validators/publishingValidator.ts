import { z } from 'zod';
export const jobSchema = z.object({
  title: z.string().trim().min(3).max(200), category: z.string().trim().min(2).max(100),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Project', 'Managed team']),
  location: z.string().trim().min(2).max(200).default('Remote — Ghana'),
  salary: z.string().trim().max(200).default('Discussed during matching'),
  description: z.string().trim().min(20).max(20000),
  responsibilities: z.array(z.string().trim().min(1).max(2000)).max(50).default([]),
  requirements: z.array(z.string().trim().min(1).max(2000)).max(50).default([]),
  techStack: z.array(z.string().trim().min(1).max(100)).max(100).default([]),
  status: z.enum(['draft', 'published', 'closed']).default('draft'),
  closesAt: z.string().datetime().nullable().optional(),
});
export const contentSchema = z.object({
  kind: z.enum(['leadership', 'insight', 'privacy', 'terms']),
  title: z.string().trim().min(2).max(200),
  slug: z.string().trim().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().trim().max(2000).default(''), body: z.string().trim().min(20).max(100000),
  imageUrl: z.union([z.literal(''), z.string().url().refine(value => /^https?:\/\//.test(value))]).default(''),
  author: z.string().trim().max(200).default(''), order: z.number().int().min(0).max(10000).default(0),
  status: z.enum(['draft', 'published']).default('draft'),
}).transform(value => ({ ...value, slug: ['privacy', 'terms'].includes(value.kind) ? value.kind : value.slug }));
export function publishedJobFilter(now = new Date()) {
  return { status: 'published', $or: [{ closesAt: null }, { closesAt: { $gt: now } }] };
}
