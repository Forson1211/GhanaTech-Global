import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { createApplicationSchema, updateApplicationSchema } from '../validators/applicationValidator';
import * as applicationService from '../services/applicationService';
import * as emailService from '../services/emailService';
import { sendSuccess, sendError } from '../utils/response';
import { sendStoredCv } from '../services/cvStorage';
import { SiteSettings } from '../models/SiteSettings';
import { JobPosting } from '../models/JobPosting';
import { publishedJobFilter } from '../validators/publishingValidator';
import path from 'path';
import fs from 'fs/promises';
import { env } from '../config/environment';

async function discardUploadedCv(req: Request) {
  if (!req.file?.path) return;
  const file = path.resolve(req.file.path), directory = path.resolve(env.UPLOAD_DIR, 'cvs');
  if (file.startsWith(directory + path.sep)) await fs.unlink(file).catch(() => {});
}

export async function submitApplication(req: Request, res: Response): Promise<void> {
  let saved = false;
  try {
    if ((await SiteSettings.findOne().lean())?.allowPublicApplications === false) { await discardUploadedCv(req); sendError(res, 'Talent applications are temporarily closed. Please contact our team directly.', 403); return; }
    const rawData = req.body;
    // Parse JSON if skills was sent as string or JSON string from FormData
    if (typeof rawData.skills === 'string') {
      try {
        const parsed = JSON.parse(rawData.skills);
        if (Array.isArray(parsed)) rawData.skills = parsed;
      } catch {
        // Leave as string to be processed by Zod transform
      }
    }

    const validatedData = createApplicationSchema.parse(rawData);
    if (validatedData.jobId) {
      const job = await JobPosting.findOne({ _id: validatedData.jobId, ...publishedJobFilter() }).lean();
      if (!job) { await discardUploadedCv(req); sendError(res, 'This opportunity is no longer accepting applications.', 409); return; }
      validatedData.role = job.title;
      validatedData.technologyArea = job.category;
    }
    const application = await applicationService.submitApplication(validatedData, req.file);
    saved = true;

    // Send notification
    await emailService.sendApplicationNotification(application).catch(() => console.error('Could not queue application notifications.'));

    sendSuccess(
      res,
      'Your application has been received successfully! Our talent team will review your profile.',
      {
        id: application._id,
        name: application.name,
        role: application.role,
        status: application.status,
      },
      201
    );
  } catch (error: any) {
    if (!saved) await discardUploadedCv(req);
    sendError(res, error.message || 'Failed to submit application', 400);
  }
}

export async function getAdminApplications(req: Request, res: Response): Promise<void> {
  try {
    const { search, status, technologyArea, role, page, limit } = req.query;

    const result = await applicationService.getAdminApplications({
      search: search as string,
      status: status as string,
      technologyArea: technologyArea as string,
      role: role as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 15,
    });

    sendSuccess(res, 'Applications retrieved successfully', result);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve applications', 500);
  }
}

export async function getAdminApplicationById(req: Request, res: Response): Promise<void> {
  try {
    const application = await applicationService.getApplicationById(req.params.id);
    sendSuccess(res, 'Application retrieved successfully', application);
  } catch (error: any) {
    sendError(res, error.message || 'Application not found', 404);
  }
}

export async function updateApplication(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const validatedData = updateApplicationSchema.parse(req.body);
    const updated = await applicationService.updateApplicationStatusAndNotes(req.params.id, validatedData, req.user?._id.toString());
    sendSuccess(res, 'Application updated successfully', updated);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update application', 400);
  }
}

export async function deleteApplication(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await applicationService.deleteApplication(req.params.id);
    sendSuccess(res, 'Application deleted successfully', { id: deleted._id });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to delete application', 400);
  }
}

export async function downloadCV(req: Request, res: Response): Promise<void> {
  try {
    const application = await applicationService.getApplicationById(req.params.id);
    if (!application.cvUrl) {
      sendError(res, 'This candidate does not have a CV uploaded', 404);
      return;
    }

    await sendStoredCv(application, res);
  } catch (error: any) {
    if (!res.headersSent) sendError(res, 'Failed to retrieve CV file', 500);
  }
}
