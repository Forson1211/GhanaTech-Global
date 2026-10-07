import { Request, Response } from 'express';
import { Statistic } from '../models/Statistic';
import { Candidate } from '../models/Candidate';
import { TalentApplication } from '../models/TalentApplication';
import { CompanyLead } from '../models/CompanyLead';
import { Service } from '../models/Service';
import { SiteSettings } from '../models/SiteSettings';
import { sendSuccess, sendError } from '../utils/response';
import { OPEN_LEAD_STATUSES } from '../utils/workflow';
import { z } from 'zod';

export async function getPublicStatistics(_req: Request, res: Response): Promise<void> {
  try {
    const stats = await Statistic.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).lean();
    sendSuccess(res, 'Statistics retrieved successfully', stats);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve statistics', 500);
  }
}

export async function getAdminStatistics(_req: Request, res: Response): Promise<void> {
  try {
    const stats = await Statistic.find().sort({ order: 1, createdAt: 1 }).lean();
    sendSuccess(res, 'Admin statistics retrieved successfully', stats);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve statistics', 500);
  }
}

export async function updateStatistic(req: Request, res: Response): Promise<void> {
  try {
    const stat = await Statistic.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!stat) {
      sendError(res, 'Statistic not found', 404);
      return;
    }
    sendSuccess(res, 'Statistic updated successfully', stat);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update statistic', 400);
  }
}

export async function getDashboardSummary(_req: Request, res: Response): Promise<void> {
  try {
    const [
      totalCandidates,
      approvedCandidates,
      pendingCandidates,
      totalApplications,
      newApplications,
      totalLeads,
      openLeads,
      activeServices,
      recentApplications,
      recentLeads,
      candidatesByAvailability,
    ] = await Promise.all([
      Candidate.countDocuments(),
      Candidate.countDocuments({ profileStatus: 'Approved' }),
      Candidate.countDocuments({ profileStatus: 'Pending' }),
      TalentApplication.countDocuments(),
      TalentApplication.countDocuments({ status: { $in: ['New', 'Applied'] } }),
      CompanyLead.countDocuments(),
      CompanyLead.countDocuments({ status: { $in: OPEN_LEAD_STATUSES } }),
      Service.countDocuments({ status: 'published' }),
      TalentApplication.find().sort({ createdAt: -1 }).limit(5).lean(),
      CompanyLead.find().sort({ createdAt: -1 }).limit(5).lean(),
      Candidate.aggregate([
        { $group: { _id: '$availability', count: { $sum: 1 } } }
      ]),
    ]);

    sendSuccess(res, 'Dashboard summary metrics retrieved successfully', {
      cards: {
        totalCandidates,
        approvedCandidates,
        pendingCandidates,
        totalApplications,
        newApplications,
        totalLeads,
        openLeads,
        activeServices,
      },
      recentApplications,
      recentLeads,
      candidatesByAvailability,
    });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve dashboard metrics', 500);
  }
}

// Site Settings
export async function getSiteSettings(_req: Request, res: Response): Promise<void> {
  try {
    let settings: any = await SiteSettings.findOne().lean();
    if (!settings) {
      const created = await SiteSettings.create({});
      settings = created.toObject();
    }
    sendSuccess(res, 'Site settings retrieved', settings);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve site settings', 500);
  }
}

export async function updateSiteSettings(req: Request, res: Response): Promise<void> {
  try {
    const data = z.object({ companyName: z.string().trim().min(2).max(200), tagline: z.string().max(500), contactEmail: z.string().trim().email(), supportPhone: z.string().max(100), accraOfficeAddress: z.string().max(500), usOfficeAddress: z.string().max(500), allowPublicApplications: z.boolean(), allowLeadSubmissions: z.boolean(), socialLinks: z.record(z.string().url().refine(value => /^https?:\/\//.test(value))).optional() }).parse(req.body);
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(data);
    } else {
      Object.assign(settings, data);
    }
    await settings.save();
    sendSuccess(res, 'Site settings updated successfully', settings);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update site settings', 400);
  }
}
