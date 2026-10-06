import { del, get, head, put } from '@vercel/blob';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import fs from 'fs';
import path from 'path';
import { Response } from 'express';
import { env } from '../config/environment';
import { readCvTicket, verifyCvMetadata } from './cvAuthorization';
import { ITalentApplication } from '../models/TalentApplication';

export async function resolveUploadedCv(token: string) {
  if (!env.BLOB_READ_WRITE_TOKEN) throw new Error('Document storage is not configured.');
  const ticket = readCvTicket(token);
  const metadata = await head(ticket.pathname, { token: env.BLOB_READ_WRITE_TOKEN });
  verifyCvMetadata(ticket, metadata);
  if (!new URL(metadata.url).hostname.endsWith('.private.blob.vercel-storage.com')) {
    throw new Error('CV storage must use a private Blob store.');
  }
  return {
    cvUrl: metadata.url, cvStorageKey: ticket.pathname, cvStorage: 'blob' as const,
    cvOriginalName: ticket.originalName, cvMimeType: ticket.contentType, cvSize: metadata.size,
  };
}

export async function storeMultipartCv(file: Express.Multer.File) {
  if (env.CV_STORAGE === 'blob') {
    const blob = await put(`cvs/${Date.now()}-${path.basename(file.originalname)}`, file.buffer, {
      access: 'private', addRandomSuffix: true, token: env.BLOB_READ_WRITE_TOKEN,
      contentType: file.mimetype || 'application/octet-stream',
    });
    return { cvUrl: blob.url, cvStorageKey: blob.pathname, cvStorage: 'blob' as const,
      cvOriginalName: file.originalname, cvMimeType: file.mimetype, cvSize: file.size };
  }
  return { cvUrl: `/uploads/cvs/${file.filename}`, cvStorage: 'local' as const,
    cvOriginalName: file.originalname, cvMimeType: file.mimetype, cvSize: file.size };
}

export async function deleteStoredCv(application: Pick<ITalentApplication, 'cvUrl' | 'cvStorage' | 'cvStorageKey'>) {
  if (application.cvStorage === 'blob' && application.cvStorageKey) {
    await del(application.cvStorageKey, { token: env.BLOB_READ_WRITE_TOKEN });
  } else if (application.cvUrl?.startsWith('/uploads/cvs/')) {
    const filename = path.basename(application.cvUrl);
    await fs.promises.unlink(path.join(env.UPLOAD_DIR, 'cvs', filename)).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== 'ENOENT') throw error;
    });
  }
}

export async function sendStoredCv(application: ITalentApplication, res: Response): Promise<void> {
  res.setHeader('Cache-Control', 'private, no-store');
  if (application.cvStorage === 'blob' && application.cvStorageKey) {
    const result = await get(application.cvStorageKey, { access: 'private', token: env.BLOB_READ_WRITE_TOKEN });
    if (!result || result.statusCode !== 200 || !result.stream) {
      res.status(404).json({ success: false, message: 'CV document not found.' });
      return;
    }
    res.type(application.cvMimeType || 'application/octet-stream');
    res.attachment(application.cvOriginalName || 'resume.pdf');
    await pipeline(Readable.fromWeb(result.stream as any), res);
    return;
  }
  if (!application.cvUrl?.startsWith('/uploads/cvs/')) {
    res.status(404).json({ success: false, message: 'CV document not found.' });
    return;
  }
  const filename = path.basename(application.cvUrl);
  res.download(path.join(env.UPLOAD_DIR, 'cvs', filename), application.cvOriginalName || filename);
}
