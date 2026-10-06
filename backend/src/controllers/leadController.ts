import { Request, Response } from 'express';
import { CompanyLead, ICompanyLead, LeadStatus } from '../models/CompanyLead';
import { createLeadSchema, updateLeadSchema } from '../validators/leadValidator';
import * as emailService from '../services/emailService';
import { sendSuccess, sendError } from '../utils/response';
import { FilterQuery } from 'mongoose';

export async function submitLead(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = createLeadSchema.parse(req.body);
    const lead = new CompanyLead(validatedData);
    await lead.save();

    emailService.sendLeadNotification(lead).catch(console.error);

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

export async function updateLead(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = updateLeadSchema.parse(req.body);
    const lead = await CompanyLead.findById(req.params.id);
    if (!lead) {
      sendError(res, 'Company lead not found', 404);
      return;
    }

    if (validatedData.status) {
      lead.status = validatedData.status;
    }
    if (validatedData.internalNotes !== undefined) {
      lead.internalNotes = validatedData.internalNotes;
    }

    await lead.save();
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
