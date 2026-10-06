import mongoose, { Schema, Document } from 'mongoose';

export type ApplicationStatus = 'New' | 'Reviewing' | 'Shortlisted' | 'Interview' | 'Accepted' | 'Rejected';

export interface ITalentApplication extends Document {
  name: string;
  email: string;
  phone: string;
  location: string;
  technologyArea: string;
  role: string;
  yearsExperience: number;
  skills: string[];
  linkedin?: string;
  github?: string;
  portfolio?: string;
  availability: string;
  desiredEngagement: string;
  cvUrl?: string;
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
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    technologyArea: { type: String, required: true, trim: true, index: true },
    role: { type: String, required: true, trim: true, index: true },
    yearsExperience: { type: Number, required: true },
    skills: [{ type: String, trim: true }],
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    portfolio: { type: String, trim: true },
    availability: { type: String, default: 'Available' },
    desiredEngagement: { type: String, default: 'Full-time' },
    cvUrl: { type: String },
    cvOriginalName: { type: String },
    cvMimeType: { type: String },
    cvSize: { type: Number },
    status: {
      type: String,
      enum: ['New', 'Reviewing', 'Shortlisted', 'Interview', 'Accepted', 'Rejected'],
      default: 'New',
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
