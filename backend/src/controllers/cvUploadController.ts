import { Request, Response } from 'express';
import { handleUpload, HandleUploadBody } from '@vercel/blob/client';
import { env } from '../config/environment';
import { issueCvTicket, readCvTicket } from '../services/cvAuthorization';
import { sendError, sendSuccess } from '../utils/response';

export function prepareCvUpload(req: Request, res: Response): void {
  if (env.CV_STORAGE !== 'blob' || !env.BLOB_READ_WRITE_TOKEN) {
    sendError(res, 'Document storage is not configured. Please contact our team.', 503);
    return;
  }
  try {
    sendSuccess(res, 'Document upload authorized.', issueCvTicket(req.body));
  } catch (error) {
    sendError(res, error instanceof Error ? error.message : 'Invalid document.', 400);
  }
}

export async function handleCvUpload(req: Request, res: Response): Promise<void> {
  if (!env.BLOB_READ_WRITE_TOKEN) {
    sendError(res, 'Document storage is not configured.', 503);
    return;
  }
  try {
    const result = await handleUpload({
      request: req,
      body: req.body as HandleUploadBody,
      token: env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!clientPayload) throw new Error('Document authorization is required.');
        const ticket = readCvTicket(clientPayload);
        if (ticket.pathname !== pathname) throw new Error('Invalid document upload path.');
        return {
          allowedContentTypes: [ticket.contentType],
          maximumSizeInBytes: ticket.size,
          addRandomSuffix: false,
          allowOverwrite: false,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
      // Submission verifies the signed ticket and stored metadata synchronously.
      // It does not depend on a webhook being delivered before the application.
      onUploadCompleted: async () => {},
    });
    res.json(result);
  } catch {
    sendError(res, 'The document upload could not be authorized. Please select your CV again and retry.', 400);
  }
}
