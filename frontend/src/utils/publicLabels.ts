import { ENGAGEMENT_TYPES, EMPLOYMENT_PREFERENCES, TALENT_TECH_AREAS } from './constants';

// Display everyday wording while keeping the existing API values and filters.
const workAreas: Record<string, string> = {
  'Cloud & DevOps': 'Cloud Systems & Automation',
  'Cloud & IT': 'Cloud & IT Support',
  'Cloud & IT Infrastructure': 'Cloud & IT Support',
  'Software Engineering': 'Software Development',
  'Data & Analytics': 'Data & Reporting',
  IT: 'IT Support',
  'Business Technology': 'Business & Project Management',
};
export const workAreaLabel = (value: string) => workAreas[value] || value;
export const workAreaOptions = TALENT_TECH_AREAS.map(value => ({ value, label: workAreaLabel(value) }));

const hiringChoices: Record<string, string> = {
  'Direct placement': 'Hire someone directly',
  'Managed talent': 'Build a team with our support',
  'Technology project': 'Get help with a project',
  'Not sure': 'Not sure yet',
};
export const hiringOptions = ENGAGEMENT_TYPES.map(value => ({ value, label: hiringChoices[value] }));

export const experienceOptions = [
  { value: 'Junior', label: 'Junior (early career)' },
  { value: 'Mid-Level', label: 'Mid-level (some experience)' },
  { value: 'Senior', label: 'Senior (experienced)' },
  { value: 'Lead', label: 'Team lead' },
  { value: 'Not sure', label: 'Not sure yet' },
];
const workTypes: Record<string, string> = {
  'Full-time': 'Full-time job',
  'Part-time': 'Part-time job',
  Contract: 'Contract work',
  Project: 'Project work',
  'Managed team': 'Dedicated team work',
};
export const workTypeLabel = (value: string) => workTypes[value] || value;
export const employmentOptions = ['Full-time', 'Part-time', 'Contract', 'Project'].map(value => ({ value, label: workTypeLabel(value) }));
export const preferenceOptions = EMPLOYMENT_PREFERENCES.map(value => ({ value, label: workTypeLabel(value) }));
export const availabilityOptions = [
  { value: 'Available', label: 'Ready to start' },
  { value: 'Interviewing', label: 'Attending interviews' },
  { value: 'Placed', label: 'Already placed in a job' },
  { value: 'Unavailable', label: 'Not available right now' },
];
export const employmentStatusOptions = [
  { value: 'Employed', label: 'Currently employed' },
  { value: 'Self-employed', label: 'Self-employed' },
  { value: 'Seeking opportunities', label: 'Looking for work' },
  { value: 'Student', label: 'Student' },
];
const skillNames: Record<string, string> = {
  SOC: 'Security monitoring (SOC)',
  IAM: 'Account access and permissions (IAM)',
  GRC: 'Risk and compliance (GRC)',
  SRE: 'System reliability (SRE)',
  BI: 'Reports and dashboards (BI)',
  Frontend: 'Frontend (website interfaces)',
  Backend: 'Backend (server-side development)',
  'QA Automation': 'Automated software testing (QA)',
};
export const skillLabel = (value: string) => skillNames[value] || value;
