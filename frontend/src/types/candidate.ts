export type CandidateStatus = 'Pending' | 'Approved' | 'Rejected';
export type CandidateAvailability = 'Available' | 'Interviewing' | 'Placed' | 'Unavailable';
export type AssessmentStatus = 'Screening' | 'Technically Assessed' | 'Evaluated' | 'Ready for Placement';

export interface PublicCandidate {
  _id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
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
  createdAt: string;
}

export interface AdminCandidate extends PublicCandidate {
  email?: string;
  phone?: string;
  internalNotes?: string;
  cvUrl?: string;
  updatedAt: string;
}

export type ApplicationStatus = 'New' | 'Reviewing' | 'Shortlisted' | 'Interview' | 'Accepted' | 'Rejected';

export interface TalentApplication {
  _id: string;
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
  availability: CandidateAvailability;
  desiredEngagement: 'Full-time' | 'Contract' | 'Part-time';
  cvUrl?: string;
  status: ApplicationStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt?: string;
}
