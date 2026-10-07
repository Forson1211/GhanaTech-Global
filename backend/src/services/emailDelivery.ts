import { EmailNotification } from '../models/EmailNotification';
import { CompanyLead } from '../models/CompanyLead';
import { SiteSettings } from '../models/SiteSettings';
import { createHash } from 'crypto';

export function emailConfiguration() {
  const apiKey = process.env.RESEND_API_KEY || '';
  const from = process.env.EMAIL_FROM || '';
  return { enabled: process.env.EMAIL_DELIVERY_ENABLED === 'true', configured: !!apiKey && /^[^\r\n]+@[^\r\n]+$/.test(from), apiKey, from };
}
export async function deliverEmail(message: { to: string; subject: string; text: string; sourceId: string; kind: string }, fetcher: typeof fetch = fetch): Promise<string> {
  const config = emailConfiguration();
  if (!config.enabled || !config.configured) throw new Error('Email delivery is not configured.');
  const key = createHash('sha256').update(message.sourceId + '/' + message.kind).digest('hex');
  const response = await fetcher('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: 'Bearer ' + config.apiKey, 'Content-Type': 'application/json', 'Idempotency-Key': key },
    body: JSON.stringify({ from: config.from, to: [message.to], subject: message.subject, text: message.text }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error('Email provider returned status ' + response.status + '.');
  const result = await response.json() as { id?: string };
  if (!result.id) throw new Error('Email provider did not acknowledge the message.');
  return result.id;
}

export async function prepareDueReminders(now = new Date()) {
  const settings = await SiteSettings.findOne().lean();
  const recipient = settings?.contactEmail || 'advisors@ghanatechglobal.com';
  const leads = await CompanyLead.find({ followUps: { $elemMatch: { completed: false, dueAt: { $lte: now } } } }).limit(200).lean();
  for (const lead of leads) for (const followUp of lead.followUps || []) {
    if (followUp.completed || followUp.dueAt > now) continue;
    // A rescheduled placement gets its own reminder, while repeated worker runs remain idempotent.
    const kind = `placement_${followUp.day}_${followUp.dueAt.toISOString().slice(0,10)}`;
    await EmailNotification.updateOne({ sourceId: String(lead._id), kind }, { $setOnInsert: { sourceId: String(lead._id), kind, to: recipient, subject: `${followUp.day}-day placement follow-up: ${lead.company}`, text: `The ${followUp.day}-day follow-up for ${lead.company} (${lead.role}) is due. Review and complete the follow-up in the company lead record.`, status: 'queued' } }, { upsert: true, runValidators: true });
  }
}

export async function processEmailOutbox(limit = 10, sourceId?: string) {
  const config = emailConfiguration();
  if (!config.enabled || !config.configured) return { configured: false, sent: 0, failed: 0 };
  if (!sourceId) await prepareDueReminders();
  const now = new Date();
  // Reclaim an interrupted attempt, but stop automatic retries before provider idempotency expires.
  await EmailNotification.updateMany({ status: 'processing', lockedAt: { $lt: new Date(now.getTime() - 5 * 60000) } }, { $set: { status: 'failed', nextAttemptAt: now, lastError: 'An interrupted delivery will be retried.' }, $unset: { lockedAt: 1 } });
  const result = { configured: true, sent: 0, failed: 0 };
  for (let index = 0; index < Math.min(Math.max(limit, 1), 20); index++) {
    const message = await EmailNotification.findOneAndUpdate({
      ...(sourceId ? { sourceId } : {}),
      status: { $in: ['pending_configuration', 'queued', 'failed'] },
      $and: [
        { $or: [{ attempts: { $lt: 5 } }, { attempts: { $exists: false } }] },
        { $or: [{ nextAttemptAt: null }, { nextAttemptAt: { $lte: now } }] },
        { $or: [{ firstAttemptAt: null }, { firstAttemptAt: { $gt: new Date(now.getTime() - 23 * 3600000) } }] },
      ],
    }, { $set: { status: 'processing', lockedAt: now }, $inc: { attempts: 1 } }, { new: true, sort: { createdAt: 1 } });
    if (!message) break;
    if (!message.firstAttemptAt) { message.firstAttemptAt = new Date(); await message.save(); }
    try {
      message.providerId = await deliverEmail(message);
      message.status = 'sent'; message.sentAt = new Date(); message.lastError = undefined; result.sent++;
    } catch (error: any) {
      message.status = 'failed'; message.lastError = String(error.message || 'Email delivery failed.').slice(0, 500);
      message.nextAttemptAt = new Date(Date.now() + Math.min(60, 2 ** message.attempts) * 60000); result.failed++;
    }
    message.lockedAt = undefined; await message.save();
    // Respect the default provider rate limit for sequential requests.
    await new Promise(resolve => setTimeout(resolve, 600));
  }
  return result;
}
