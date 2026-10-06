import path from 'path';
import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../config/environment';

export const MAX_CV_SIZE = 10 * 1024 * 1024;
const mimeTypes: Record<string, CvTicket['contentType']> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
const ticketSchema = z.object({
  pathname: z.string().regex(/^cvs\/[a-f0-9-]{36}\.(pdf|doc|docx)$/),
  originalName: z.string().min(1).max(200),
  contentType: z.enum(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  size: z.number().int().positive().max(MAX_CV_SIZE),
});
export type CvTicket = z.infer<typeof ticketSchema>;

export function issueCvTicket(input: unknown) {
  const file = z.object({
    name: z.string().min(1).max(200).refine((name) => !/[\\/\r\n\0]/.test(name), 'Invalid document filename'),
    size: z.number().int().positive().max(MAX_CV_SIZE, 'Your CV must be 10 MB or smaller'),
    contentType: z.string().max(200).optional(),
  }).parse(input);
  const extension = path.extname(file.name).toLowerCase();
  const contentType = mimeTypes[extension];
  if (!contentType) throw new Error('Only PDF, DOC and DOCX documents are accepted.');
  if (file.contentType && file.contentType !== 'application/octet-stream' && file.contentType !== contentType) {
    throw new Error('The document type does not match its filename.');
  }
  const ticket: CvTicket = { pathname: `cvs/${randomUUID()}${extension}`, originalName: file.name, contentType, size: file.size };
  const token = jwt.sign(ticket, env.JWT_SECRET, {
    algorithm: 'HS256', audience: 'cv-upload', issuer: 'ghanatech-global', expiresIn: '30m',
  });
  return { token, pathname: ticket.pathname, contentType };
}

export function readCvTicket(token: string): CvTicket {
  return ticketSchema.parse(jwt.verify(token, env.JWT_SECRET, {
    algorithms: ['HS256'], audience: 'cv-upload', issuer: 'ghanatech-global',
  }));
}

export function verifyCvMetadata(ticket: CvTicket, metadata: { pathname: string; size: number; contentType: string }) {
  if (metadata.pathname !== ticket.pathname || metadata.size !== ticket.size || metadata.contentType !== ticket.contentType) {
    throw new Error('The uploaded CV does not match the authorized document.');
  }
}
