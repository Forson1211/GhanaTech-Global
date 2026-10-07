import { ITalentApplication } from '../models/TalentApplication';
import { ICompanyLead } from '../models/CompanyLead';
import { EmailNotification } from '../models/EmailNotification';
import { SiteSettings } from '../models/SiteSettings';
import { processEmailOutbox } from './emailDelivery';

async function prepare(sourceId: string, kind: string, to: string, subject: string, text: string) {
  await EmailNotification.updateOne({ sourceId, kind }, { $setOnInsert: { sourceId, kind, to, subject, text, status: 'pending_configuration' } }, { upsert: true, runValidators: true });
}
export async function sendApplicationNotification(application: ITalentApplication): Promise<void> {
  const sourceId = application._id.toString();
  const settings = await SiteSettings.findOne().lean();
  await Promise.all([
    prepare(sourceId, 'candidate_confirmation', application.email, "Welcome to GhanaTech Global's Talent Network.", `Hello ${application.name},\n\nWelcome to GhanaTech Global's Talent Network. Your application for ${application.role} has been received. Our talent team will review your information and contact you about next steps.`),
    prepare(sourceId, 'candidate_internal', settings?.contactEmail || 'advisors@ghanatechglobal.com', 'New talent application', `${application.name} applied for ${application.role}. Review the application in the admin portal.`),
  ]);
  await processEmailOutbox(2, sourceId);
}
export async function sendLeadNotification(lead: ICompanyLead): Promise<void> {
  const sourceId = lead._id.toString();
  const settings = await SiteSettings.findOne().lean();
  const subject = lead.source === 'contact' ? 'Your message has been received.' : 'Your technology talent request has been received.';
  await Promise.all([
    prepare(sourceId, 'employer_confirmation', lead.email, subject, `Hello ${lead.name},\n\n${subject} Our team will review your request and contact you about next steps.`),
    prepare(sourceId, 'employer_internal', settings?.contactEmail || 'advisors@ghanatechglobal.com', 'New company inquiry', `${lead.name} at ${lead.company} submitted a request for ${lead.role}. Review it in the admin portal.`),
  ]);
  await processEmailOutbox(2, sourceId);
}
export async function sendEmployerFollowUp(lead: ICompanyLead): Promise<void> {
  await prepare(lead._id.toString(), 'employer_discovery_follow_up', lead.email, 'Next steps for your technology requirement', `Hello ${lead.name},\n\nThank you for discussing your needs with GhanaTech Global. Your job requirement for ${lead.role} has been recorded. Our team will prepare the next steps for candidate matching or project delivery.`);
  await processEmailOutbox(2, lead._id.toString());
}
