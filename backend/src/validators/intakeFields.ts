import { z } from 'zod';
export const stringList = z.union([z.array(z.string().trim().min(1).max(100)).max(100), z.string().max(10000)]).transform(value => [...new Set((Array.isArray(value) ? value : value.split(',')).map(item => item.trim()).filter(Boolean))]);
export const optionalUrl = z.union([z.literal(''), z.string().url().refine(value => /^https?:\/\//i.test(value), 'Use an http or https URL')]).optional();
export const optionalDate = z.string().refine(value => !value || (/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value), 'Provide a valid date').optional();
