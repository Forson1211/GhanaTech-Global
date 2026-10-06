import mongoose, { Schema, Document } from 'mongoose';

export type CandidateStatus = 'Pending' | 'Approved' | 'Rejected';
export type CandidateAvailability = 'Available' | 'Interviewing' | 'Placed' | 'Unavailable';
export type AssessmentStatus = 'Screening' | 'Technically Assessed' | 'Evaluated' | 'Ready for Placement';

export interface ICandidate extends Document {
  firstName: string;
  lastName: string;
  headline: string;
  location: string;
  country: string;
  role: string;
  category: string;
  yearsExperience: number;
  skills: string[];
  bio: string;
  profileImage?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  availability: CandidateAvailability;
  assessmentStatus: AssessmentStatus;
  profileStatus: CandidateStatus;
  // Private / Admin only fields
  email?: string;
  phone?: string;
  internalNotes?: string;
  cvUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CandidateSchema = new Schema<ICandidate>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    headline: { type: String, required: true, trim: true },
    location: { type: String, default: 'Accra', trim: true },
    country: { type: String, default: 'Ghana', trim: true },
    role: { type: String, required: true, trim: true, index: true },
    category: { type: String, required: true, trim: true, index: true },
    yearsExperience: { type: Number, required: true, min: 0 },
    skills: [{ type: String, trim: true }],
    bio: { type: String, required: true },
    profileImage: { type: String },
    linkedinUrl: { type: String },
    githubUrl: { type: String },
    portfolioUrl: { type: String },
    availability: {
      type: String,
      enum: ['Available', 'Interviewing', 'Placed', 'Unavailable'],
      default: 'Available',
      index: true,
    },
    assessmentStatus: {
      type: String,
      enum: ['Screening', 'Technically Assessed', 'Evaluated', 'Ready for Placement'],
      default: 'Ready for Placement',
    },
    profileStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Approved',
      index: true,
    },
    // Private fields
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    internalNotes: { type: String },
    cvUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Compound text index for search
CandidateSchema.index({
  firstName: 'text',
  lastName: 'text',
  headline: 'text',
  role: 'text',
  skills: 'text',
  bio: 'text',
});

export const Candidate = mongoose.model<ICandidate>('Candidate', CandidateSchema);
