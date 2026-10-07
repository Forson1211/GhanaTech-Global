export type LeadStatus = typeof import('@/utils/constants').LEAD_STATUSES[number];

export interface CompanyLead {
  _id?: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  companySize?: string;
  technologyNeed: string;
  role: string;
  numberOfProfessionals: number;
  engagementType: string;
  budgetRange?: string;
  message?: string;
  requiredSkills?: string[];
  experienceLevel?: string;
  employmentType?: string;
  desiredStartDate?: string;
  jobDescription?: string;
  discoveryAt?: string;
  placedAt?: string;
  followUps?: { day: 30 | 60 | 90; dueAt: string; completed: boolean }[];
  statusHistory?: { status: string; changedAt: string; changedBy?: string }[];
  status: LeadStatus;
  internalNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HireTalentFormPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  companySize: string;
  technologyNeed: string;
  role: string;
  numberOfProfessionals: number;
  engagementType: string;
  budgetRange: string;
  message: string;
  requiredSkills?: string[];
  experienceLevel?: string;
  employmentType?: string;
  desiredStartDate?: string;
  jobDescription?: string;
  candidateId?: string;
  candidateName?: string;
}
