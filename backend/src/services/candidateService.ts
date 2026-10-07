import { Candidate, ICandidate } from '../models/Candidate';
import { FilterQuery } from 'mongoose';

// Fields strictly excluded from public views to protect candidate privacy
export const PUBLIC_EXCLUDED_FIELDS = '-email -phone -internalNotes -cvUrl';

export interface CandidateQueryOptions {
  search?: string;
  category?: string;
  role?: string;
  skills?: string;
  experience?: string;
  availability?: string;
  page?: number;
  limit?: number;
}

export async function getPublicCandidates(options: CandidateQueryOptions) {
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(options.limit) || 12));
  const skip = (page - 1) * limit;

  const filter: FilterQuery<ICandidate> = {
    profileStatus: 'Approved',
  };

  if (options.category && options.category !== 'All') {
    filter.category = options.category;
  }

  if (options.role && options.role !== 'All') {
    filter.role = { $regex: options.role, $options: 'i' };
  }

  if (options.availability && options.availability !== 'All') {
    filter.availability = options.availability as any;
  }

  if (options.experience && options.experience !== 'All') {
    if (/^\d+(\.\d+)?$/.test(options.experience)) {
      filter.yearsExperience = { $gte: Number(options.experience) };
    } else if (options.experience === '1-3 years') {
      filter.yearsExperience = { $gte: 1, $lte: 3 };
    } else if (options.experience === '3-5 years') {
      filter.yearsExperience = { $gte: 3, $lte: 5 };
    } else if (options.experience === '5+ years') {
      filter.yearsExperience = { $gte: 5 };
    }
  }

  if (options.skills) {
    const skillList = options.skills.split(',').map((s) => s.trim()).filter(Boolean);
    if (skillList.length > 0) {
      filter.skills = { $in: skillList.map((s) => new RegExp(s, 'i')) };
    }
  }

  if (options.search) {
    const searchRegex = new RegExp(options.search.trim(), 'i');
    filter.$or = [
      { firstName: searchRegex },
      { lastName: searchRegex },
      { headline: searchRegex },
      { role: searchRegex },
      { skills: { $in: [searchRegex] } },
      { bio: searchRegex },
    ];
  }

  const [candidates, total] = await Promise.all([
    Candidate.find(filter)
      .select(PUBLIC_EXCLUDED_FIELDS)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Candidate.countDocuments(filter),
  ]);

  return {
    candidates,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1,
    },
  };
}

export async function getPublicCandidateById(id: string) {
  const candidate = await Candidate.findOne({
    _id: id,
    profileStatus: 'Approved',
  })
    .select(PUBLIC_EXCLUDED_FIELDS)
    .lean();

  if (!candidate) {
    throw new Error('Candidate not found or not approved for public display');
  }

  return candidate;
}

export async function getAdminCandidates(options: CandidateQueryOptions & { profileStatus?: string }) {
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(options.limit) || 15));
  const skip = (page - 1) * limit;

  const filter: FilterQuery<ICandidate> = {};

  if (options.profileStatus && options.profileStatus !== 'All') {
    filter.profileStatus = options.profileStatus as any;
  }

  if (options.category && options.category !== 'All') {
    filter.category = options.category;
  }

  if (options.role && options.role !== 'All') {
    filter.role = { $regex: options.role, $options: 'i' };
  }

  if (options.availability && options.availability !== 'All') {
    filter.availability = options.availability as any;
  }

  if (options.search) {
    const searchRegex = new RegExp(options.search.trim(), 'i');
    filter.$or = [
      { firstName: searchRegex },
      { lastName: searchRegex },
      { headline: searchRegex },
      { role: searchRegex },
      { email: searchRegex },
      { skills: { $in: [searchRegex] } },
    ];
  }

  const [candidates, total] = await Promise.all([
    Candidate.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Candidate.countDocuments(filter),
  ]);

  return {
    candidates,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1,
    },
  };
}

export async function getAdminCandidateById(id: string) {
  const candidate = await Candidate.findById(id);
  if (!candidate) {
    throw new Error('Candidate not found');
  }
  return candidate;
}

export async function createCandidate(data: any) {
  const candidate = new Candidate(data);
  return candidate.save();
}

export async function updateCandidate(id: string, data: any) {
  const candidate = await Candidate.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  if (!candidate) {
    throw new Error('Candidate not found');
  }
  return candidate;
}

export async function updateCandidateStatus(
  id: string,
  statuses: {
    profileStatus?: string;
    availability?: string;
    assessmentStatus?: string;
  }
) {
  const updatePayload: any = {};
  if (statuses.profileStatus) updatePayload.profileStatus = statuses.profileStatus;
  if (statuses.availability) updatePayload.availability = statuses.availability;
  if (statuses.assessmentStatus) updatePayload.assessmentStatus = statuses.assessmentStatus;

  const candidate = await Candidate.findByIdAndUpdate(id, { $set: updatePayload }, { new: true });
  if (!candidate) {
    throw new Error('Candidate not found');
  }
  return candidate;
}

export async function deleteCandidate(id: string) {
  const candidate = await Candidate.findByIdAndDelete(id);
  if (!candidate) {
    throw new Error('Candidate not found');
  }
  return candidate;
}
