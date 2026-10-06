export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Closed' | 'Rejected';

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
  candidateId?: string;
  candidateName?: string;
}
