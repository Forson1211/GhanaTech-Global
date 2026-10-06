import { TalentApplication, ITalentApplication, ApplicationStatus } from '../models/TalentApplication';
import { FilterQuery } from 'mongoose';
import path from 'path';
import fs from 'fs';
import { env } from '../config/environment';

export interface ApplicationQueryOptions {
  search?: string;
  status?: string;
  technologyArea?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export async function submitApplication(data: any, file?: Express.Multer.File): Promise<ITalentApplication> {
  const applicationData = { ...data };

  if (file) {
    applicationData.cvUrl = `/uploads/cvs/${file.filename}`;
    applicationData.cvOriginalName = file.originalname;
    applicationData.cvMimeType = file.mimetype;
    applicationData.cvSize = file.size;
  }

  const application = new TalentApplication(applicationData);
  return application.save();
}

export async function getAdminApplications(options: ApplicationQueryOptions) {
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(options.limit) || 15));
  const skip = (page - 1) * limit;

  const filter: FilterQuery<ITalentApplication> = {};

  if (options.status && options.status !== 'All') {
    filter.status = options.status as ApplicationStatus;
  }

  if (options.technologyArea && options.technologyArea !== 'All') {
    filter.technologyArea = options.technologyArea;
  }

  if (options.role && options.role !== 'All') {
    filter.role = { $regex: options.role, $options: 'i' };
  }

  if (options.search) {
    const searchRegex = new RegExp(options.search.trim(), 'i');
    filter.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { role: searchRegex },
      { location: searchRegex },
      { skills: { $in: [searchRegex] } },
    ];
  }

  const [applications, total] = await Promise.all([
    TalentApplication.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    TalentApplication.countDocuments(filter),
  ]);

  return {
    applications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1,
    },
  };
}

export async function getApplicationById(id: string): Promise<ITalentApplication> {
  const application = await TalentApplication.findById(id);
  if (!application) {
    throw new Error('Application not found');
  }
  return application;
}

export async function updateApplicationStatusAndNotes(
  id: string,
  update: { status?: ApplicationStatus; internalNotes?: string }
): Promise<ITalentApplication> {
  const application = await TalentApplication.findById(id);
  if (!application) {
    throw new Error('Application not found');
  }

  if (update.status) {
    application.status = update.status;
  }
  if (update.internalNotes !== undefined) {
    application.internalNotes = update.internalNotes;
  }

  return application.save();
}

export async function deleteApplication(id: string): Promise<ITalentApplication> {
  const application = await TalentApplication.findByIdAndDelete(id);
  if (!application) {
    throw new Error('Application not found');
  }

  // Clean up CV file on disk if exists
  if (application.cvUrl) {
    const filename = path.basename(application.cvUrl);
    const filePath = path.join(env.UPLOAD_DIR, 'cvs', filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Failed to unlink CV file:', err);
      }
    }
  }

  return application;
}
