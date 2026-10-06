import { ITalentApplication } from '../models/TalentApplication';
import { ICompanyLead } from '../models/CompanyLead';

/**
 * Service to handle transactional email and notifications.
 * Can be connected to SendGrid, Resend, AWS SES or SMTP.
 */
export async function sendApplicationNotification(application: ITalentApplication): Promise<void> {
  // In development / demo mode, log the notification
  console.log(
    `[EMAIL NOTIFICATION] New Talent Application received from ${application.name} (${application.email}) for role ${application.role}`
  );
}

export async function sendLeadNotification(lead: ICompanyLead): Promise<void> {
  // In development / demo mode, log the notification
  console.log(
    `[EMAIL NOTIFICATION] New Company Lead received from ${lead.name} at ${lead.company} (${lead.email}) for ${lead.numberOfProfessionals}x ${lead.role}`
  );
}
