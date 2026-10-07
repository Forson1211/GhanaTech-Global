export const POPULAR_ROLES = [
  'SOC Analyst',
  'Security Engineer',
  'GRC Analyst',
  'IAM Specialist',
  'Cloud Engineer',
  'AWS Engineer',
  'Azure Engineer',
  'DevOps Engineer',
  'Systems Administrator',
  'IT Support Specialist',
  'Frontend Developer',
  'Backend Developer',
  'Full-Stack Developer',
  'QA Engineer',
  'Data Analyst',
  'Data Engineer',
  'Business Analyst',
  'Security Analyst', 'Cloud Security Engineer', 'SRE Engineer', 'Kubernetes Engineer', 'Mobile Developer', 'QA Automation Engineer', 'BI Analyst', 'SQL Developer', 'Data Scientist', 'Power BI Developer', 'Help Desk Technician', 'Network Engineer', 'Project Manager', 'Scrum Master', 'Product Manager', 'Program Manager',
] as const;

export const TECH_CATEGORIES = [
  { name: 'Cybersecurity', slug: 'cybersecurity', icon: 'ShieldCheck', desc: 'SOC analysts, GRC consultants, security engineers & IAM specialists.' },
  { name: 'Cloud & IT', slug: 'cloud-it', icon: 'Cloud', desc: 'AWS/Azure cloud architects, DevOps engineers & infrastructure specialists.' },
  { name: 'Software Engineering', slug: 'software', icon: 'Code', desc: 'Frontend, backend, and full-stack developers in modern tech stacks.' },
  { name: 'Data & Analytics', slug: 'data', icon: 'Database', desc: 'Data engineers, BI analysts, pipeline architects & reporting experts.' },
] as const;

export const SENIORITY_LEVELS = ['Junior', 'Mid-Level', 'Senior'] as const;

export const AVAILABILITY_OPTIONS = [
  'Available',
  'Interviewing',
  'Placed',
  'Unavailable',
] as const;

export const APPLICATION_STATUSES = ['Applied', 'Screening', 'Technical Assessment', 'Interview', 'Verified', 'Talent Pool', 'Presented', 'Client Interview', 'Selected', 'Placed', 'Rejected', 'New', 'Reviewing', 'Shortlisted', 'Accepted'] as const;
export const LEAD_STATUSES = ['New', 'Contacted', 'Discovery Scheduled', 'Qualified', 'Job Requirement Received', 'Candidates Presented', 'Client Interviews', 'Offer', 'Closed Won', 'Closed Lost', 'Proposal', 'Closed', 'Rejected'] as const;
export const TALENT_TECH_AREAS = ['Cybersecurity', 'Cloud & DevOps', 'Software Engineering', 'Data & Analytics', 'IT', 'Business Technology', 'Cloud & IT'] as const;
export const EMPLOYMENT_PREFERENCES = ['Full-time', 'Contract', 'Project', 'Managed team'] as const;
export const SKILLS_BY_AREA: Record<string, string[]> = {
  Cybersecurity: ['Security Analysis', 'Security Engineering', 'SOC', 'IAM', 'GRC', 'Cloud Security'],
  'Cloud & DevOps': ['AWS', 'Azure', 'DevOps', 'SRE', 'Infrastructure', 'Automation', 'Kubernetes'],
  'Software Engineering': ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'QA Automation', 'TypeScript', 'Python', 'Java'],
  'Data & Analytics': ['Data Analysis', 'Data Engineering', 'BI', 'SQL', 'Data Science', 'Power BI', 'Reporting'],
  IT: ['Help Desk', 'Systems Administration', 'Networking', 'Infrastructure', 'Technical Support'],
  'Business Technology': ['Business Analysis', 'Project Management', 'Scrum', 'Product Management', 'Program Management'],
  'Cloud & IT': ['AWS', 'Azure', 'DevOps', 'Kubernetes', 'Systems Administration', 'Networking'],
};

export const CANDIDATE_STATUSES = [
  'Pending',
  'Approved',
  'Rejected',
] as const;

export const COMPANY_SIZES = [
  '1 - 10 employees',
  '11 - 50 employees',
  '51 - 200 employees',
  '201 - 1,000 employees',
  '1,000+ employees',
] as const;

export const ENGAGEMENT_TYPES = ['Direct placement', 'Managed talent', 'Technology project', 'Not sure'] as const;

export const BUDGET_RANGES = [
  '$25k - $45k / year',
  '$45k - $70k / year',
  '$70k - $120k / year',
  '$120k+ / year',
] as const;

// Fallback baseline for value calculator if backend is initial loading
export const DEFAULT_CALCULATOR_DATA = [
  { role: 'Frontend Developer', seniority: 'Mid-Level', us: 125000, ghana: 38000 },
  { role: 'Backend Developer', seniority: 'Mid-Level', us: 135000, ghana: 42000 },
  { role: 'Full-Stack Developer', seniority: 'Mid-Level', us: 140000, ghana: 44000 },
  { role: 'DevOps Engineer', seniority: 'Mid-Level', us: 145000, ghana: 46000 },
  { role: 'Cloud Engineer', seniority: 'Mid-Level', us: 140000, ghana: 45000 },
  { role: 'AWS Engineer', seniority: 'Mid-Level', us: 142000, ghana: 45000 },
  { role: 'Azure Engineer', seniority: 'Mid-Level', us: 140000, ghana: 44000 },
  { role: 'Security Engineer', seniority: 'Mid-Level', us: 150000, ghana: 48000 },
  { role: 'SOC Analyst', seniority: 'Mid-Level', us: 110000, ghana: 35000 },
  { role: 'GRC Analyst', seniority: 'Mid-Level', us: 120000, ghana: 36000 },
  { role: 'IAM Specialist', seniority: 'Mid-Level', us: 130000, ghana: 39000 },
  { role: 'Data Analyst', seniority: 'Mid-Level', us: 105000, ghana: 32000 },
  { role: 'Data Engineer', seniority: 'Mid-Level', us: 138000, ghana: 43000 },
  { role: 'QA Engineer', seniority: 'Mid-Level', us: 105000, ghana: 33000 },
  { role: 'Systems Administrator', seniority: 'Mid-Level', us: 100000, ghana: 30000 },
  { role: 'IT Support Specialist', seniority: 'Mid-Level', us: 75000, ghana: 24000 },
  { role: 'Business Analyst', seniority: 'Mid-Level', us: 115000, ghana: 35000 },
];
