import mongoose, { Schema, Document } from 'mongoose';

import { APPLICATION_STATUSES, statusHistoryDefinition, type StatusHistoryEntry } from '../utils/workflow';
export type ApplicationStatus = typeof APPLICATION_STATUSES[number];

export interface ITalentApplication extends Document {
  name: string;
  firstName?: string;
  lastName?: string;
  employmentStatus?: string;
  education?: string;
  certifications?: string[];
  employmentPreferences?: string[];
  consent?: boolean;
  consentAt?: Date;
  consentVersion?: string;
  statusHistory?: StatusHistoryEntry[];
  email: string;
  phone: string;
  location: string;
  technologyArea: string;
  role: string;
  jobId?: string;
  yearsExperience: number;
  skills: string[];
  linkedin?: string;
  github?: string;
  portfolio?: string;
  availability: string;
  desiredEngagement: string;
  cvUrl?: string;
  cvStorageKey?: string;
  cvStorage?: 'local' | 'blob';
  cvOriginalName?: string;
  cvMimeType?: string;
  cvSize?: number;
  status: ApplicationStatus;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TalentApplicationSchema = new Schema<ITalentApplication>(
  {
    name: { type: String, required: true, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    employmentStatus: { type: String, trim: true },
    education: { type: String, trim: true },
    certifications: [{ type: String, trim: true }],
    employmentPreferences: [{ type: String, enum: ['Full-time', 'Contract', 'Project', 'Managed team', 'Part-time'] }],
    consent: { type: Boolean },
    consentAt: { type: Date },
    consentVersion: { type: String },
    statusHistory: [new Schema(statusHistoryDefinition, { _id: false })],
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    technologyArea: { type: String, required: true, trim: true, index: true },
    role: { type: String, required: true, trim: true, index: true },
    jobId: { type: String, index: true },
    yearsExperience: { type: Number, required: true },
    skills: [{ type: String, trim: true }],
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    portfolio: { type: String, trim: true },
    availability: { type: String, default: 'Available' },
    desiredEngagement: { type: String, default: 'Full-time' },
    cvUrl: { type: String },
    cvStorageKey: { type: String, unique: true, sparse: true },
    cvStorage: { type: String, enum: ['local', 'blob'] },
    cvOriginalName: { type: String },
    cvMimeType: { type: String },
    cvSize: { type: Number },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: 'Applied',
      index: true,
    },
    internalNotes: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

TalentApplicationSchema.index({ name: 'text', email: 'text', role: 'text', skills: 'text' });

export const TalentApplication = mongoose.model<ITalentApplication>('TalentApplication', TalentApplicationSchema);
