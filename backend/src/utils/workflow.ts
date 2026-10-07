export const LEAD_STATUSES = ['New', 'Contacted', 'Discovery Scheduled', 'Qualified', 'Job Requirement Received', 'Candidates Presented', 'Client Interviews', 'Offer', 'Closed Won', 'Closed Lost', 'Proposal', 'Closed', 'Rejected'] as const;
export const APPLICATION_STATUSES = ['Applied', 'Screening', 'Technical Assessment', 'Interview', 'Verified', 'Talent Pool', 'Presented', 'Client Interview', 'Selected', 'Placed', 'Rejected', 'New', 'Reviewing', 'Shortlisted', 'Accepted'] as const;
export const OPEN_LEAD_STATUSES = LEAD_STATUSES.filter(status => !['Closed Won', 'Closed Lost', 'Closed', 'Rejected'].includes(status));
export interface StatusHistoryEntry { status: string; changedAt: Date; changedBy?: string; }
export const statusHistoryDefinition = { status: { type: String, required: true }, changedAt: { type: Date, default: Date.now }, changedBy: { type: String } };
export function placementFollowUps(placedAt: Date) {
  return [30, 60, 90].map(day => ({ day, dueAt: new Date(placedAt.getTime() + day * 86400000), completed: false }));
}
