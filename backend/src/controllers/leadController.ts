import { Request, Response } from 'express';
import { CompanyLead, ICompanyLead, LeadStatus } from '../models/CompanyLead';
import { createLeadSchema, updateLeadSchema } from '../validators/leadValidator';
import * as emailService from '../services/emailService';
import { sendSuccess, sendError } from '../utils/response';
import { FilterQuery } from 'mongoose';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { placementFollowUps } from '../utils/workflow';
import { SiteSettings } from '../models/SiteSettings';
import { z } from 'zod';

export async function submitLead(req: Request, res: Response): Promise<void> {
  try {
    if ((await SiteSettings.findOne().lean())?.allowLeadSubmissions === false) { sendError(res, 'Company inquiries are temporarily closed. Please contact our team directly.', 403); return; }
    const validatedData = createLeadSchema.parse(req.body);
    const lead = new CompanyLead({ ...validatedData, statusHistory: [{ status: 'New', changedAt: new Date() }] });
    await lead.save();

    await emailService.sendLeadNotification(lead).catch(() => console.error('Could not queue lead notifications.'));

    sendSuccess(
      res,
      'Thank you! Your hiring request has been received. Our solutions team will contact you shortly.',
      {
        id: lead._id,
        company: lead.company,
        role: lead.role,
        status: lead.status,
      },
      201
    );
  } catch (error: any) {
    sendError(res, error.message || 'Failed to submit hiring request', 400);
  }
}

export async function getAdminLeads(req: Request, res: Response): Promise<void> {
  try {
    const { search, status, technologyNeed, page, limit } = req.query;

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(100, Math.max(1, Number(limit) || 15));
    const skip = (pageNum - 1) * limitNum;

    const filter: FilterQuery<ICompanyLead> = {};

    if (status && status !== 'All') {
      filter.status = status as LeadStatus;
    }

    if (technologyNeed && technologyNeed !== 'All') {
      filter.technologyNeed = technologyNeed as string;
    }

    if (search) {
      const searchRegex = new RegExp((search as string).trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { company: searchRegex },
        { email: searchRegex },
        { role: searchRegex },
      ];
    }

    const [leads, total] = await Promise.all([
      CompanyLead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      CompanyLead.countDocuments(filter),
    ]);

    sendSuccess(res, 'Company leads retrieved successfully', {
      leads,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve company leads', 500);
  }
}

export async function getAdminLeadById(req: Request, res: Response): Promise<void> {
  try {
    const lead = await CompanyLead.findById(req.params.id);
    if (!lead) {
      sendError(res, 'Company lead not found', 404);
      return;
    }
    sendSuccess(res, 'Company lead retrieved successfully', lead);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve lead', 500);
  }
}

export async function updateLead(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const validatedData = updateLeadSchema.parse(req.body);
    const lead = await CompanyLead.findById(req.params.id);
    if (!lead) {
      sendError(res, 'Company lead not found', 404);
      return;
    }

    const previousStatus = lead.status;
    if (validatedData.status && validatedData.status !== lead.status) {
      lead.statusHistory ||= [];
      lead.statusHistory.push({ status: validatedData.status, changedAt: new Date(), changedBy: req.user?._id.toString() });
      lead.status = validatedData.status;
    }
    if (validatedData.internalNotes !== undefined) {
      lead.internalNotes = validatedData.internalNotes;
    }

    if (validatedData.discoveryAt) lead.discoveryAt = new Date(validatedData.discoveryAt);
    if (validatedData.placedAt) {
      const placedAt = new Date(validatedData.placedAt);
      if (!lead.placedAt || lead.placedAt.getTime() !== placedAt.getTime()) {
        lead.placedAt = placedAt;
        lead.followUps = placementFollowUps(placedAt);
      }
    }
    if (validatedData.followUps) {
      for (const followUp of validatedData.followUps) {
        const existing = lead.followUps?.find(item => item.day === followUp.day);
        if (existing) existing.completed = followUp.completed;
      }
    }
    await lead.save();
    if (previousStatus !== 'Job Requirement Received' && lead.status === 'Job Requirement Received') {
      await emailService.sendEmployerFollowUp(lead).catch(() => console.error('Could not queue employer follow-up.'));
    }
    sendSuccess(res, 'Company lead updated successfully', lead);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update company lead', 400);
  }
}

export async function deleteLead(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await CompanyLead.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, 'Company lead not found', 404);
      return;
    }
    sendSuccess(res, 'Company lead deleted successfully', { id: deleted._id });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to delete company lead', 400);
  }
}

const contactSchema = z.object({ name: z.string().trim().min(2).max(200), email: z.string().trim().email().max(254), subject: z.string().trim().min(2).max(200), message: z.string().trim().min(2).max(10000) });
export async function submitContact(req: Request, res: Response): Promise<void> {
  try {
    if ((await SiteSettings.findOne().lean())?.allowLeadSubmissions === false) { sendError(res, 'Contact submissions are temporarily closed.', 403); return; }
    const data = contactSchema.parse(req.body);
    const lead = await new CompanyLead({ ...data, company: 'Contact inquiry', role: data.subject, technologyNeed: 'General inquiry', engagementType: 'Not sure', source: 'contact', statusHistory: [{ status: 'New', changedAt: new Date() }] }).save();
    await emailService.sendLeadNotification(lead).catch(() => console.error('Could not queue contact notifications.'));
    sendSuccess(res, 'Your message has been received.', { id: lead._id }, 201);
  } catch { sendError(res, 'Unable to save your message. Check the form and try again.', 400); }
}
