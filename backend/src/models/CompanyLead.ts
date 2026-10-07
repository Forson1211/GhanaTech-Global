import mongoose, { Schema, Document } from 'mongoose';

import { LEAD_STATUSES, statusHistoryDefinition, type StatusHistoryEntry } from '../utils/workflow';
export type LeadStatus = typeof LEAD_STATUSES[number];

export interface ICompanyLead extends Document {
  name: string;
  source?: 'hiring' | 'contact';
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
  statusHistory?: StatusHistoryEntry[];
  discoveryAt?: Date;
  placedAt?: Date;
  followUps?: { day: number; dueAt: Date; completed: boolean }[];
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
    source: { type: String, enum: ['hiring', 'contact'], default: 'hiring' },
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
    requiredSkills: [{ type: String, trim: true }],
    experienceLevel: { type: String, trim: true },
    employmentType: { type: String, trim: true },
    desiredStartDate: { type: String },
    jobDescription: { type: String },
    statusHistory: [new Schema(statusHistoryDefinition, { _id: false })],
    discoveryAt: { type: Date },
    placedAt: { type: Date },
    followUps: [new Schema({ day: { type: Number, enum: [30, 60, 90] }, dueAt: { type: Date }, completed: { type: Boolean, default: false } }, { _id: false })],
    status: {
      type: String,
      enum: LEAD_STATUSES,
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
