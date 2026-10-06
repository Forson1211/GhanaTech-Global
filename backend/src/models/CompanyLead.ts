import mongoose, { Schema, Document } from 'mongoose';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Closed' | 'Rejected';

export interface ICompanyLead extends Document {
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
  candidateId?: string;
  candidateName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanyLeadSchema = new Schema<ICompanyLead>(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true },
    companySize: { type: String, trim: true },
    technologyNeed: { type: String, required: true, trim: true, index: true },
    role: { type: String, required: true, trim: true },
    numberOfProfessionals: { type: Number, default: 1 },
    engagementType: { type: String, default: 'Full-Time Dedicated' },
    budgetRange: { type: String, trim: true },
    message: { type: String },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Closed', 'Rejected'],
      default: 'New',
      index: true,
    },
    internalNotes: { type: String, default: '' },
    candidateId: { type: String },
    candidateName: { type: String },
  },
  {
    timestamps: true,
  }
);

CompanyLeadSchema.index({ company: 'text', name: 'text', email: 'text', role: 'text' });

export const CompanyLead = mongoose.model<ICompanyLead>('CompanyLead', CompanyLeadSchema);
