import { Router } from 'express';
import { timingSafeEqual } from 'crypto';
import { EmailNotification } from '../models/EmailNotification';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';
import { authenticateUser } from '../middleware/authMiddleware';
import { emailConfiguration, processEmailOutbox } from '../services/emailDelivery';
import { sendSuccess, sendError } from '../utils/response';
export const communicationRoutes = Router();
communicationRoutes.use(authenticateUser);
communicationRoutes.get('/', async (_req, res, next) => {
  try {
    const { enabled, configured } = emailConfiguration();
    const [messages, subscribers] = await Promise.all([EmailNotification.find().sort({ createdAt: -1 }).limit(100).select('-text').lean(), NewsletterSubscriber.find().sort({ createdAt: -1 }).limit(500).lean()]);
    sendSuccess(res, 'Communications retrieved', { enabled, configured, messages, subscribers });
  } catch (error) { next(error); }
});
communicationRoutes.post('/process', async (_req, res, next) => {
  try { sendSuccess(res, 'Email queue processed', await processEmailOutbox()); } catch (error) { next(error); }
});
export const cronRoutes = Router();
cronRoutes.get('/communications', async (req, res, next) => {
  const expected = process.env.CRON_SECRET ? 'Bearer ' + process.env.CRON_SECRET : '';
  const provided = req.get('authorization') || '';
  const expectedBytes = Buffer.from(expected), providedBytes = Buffer.from(provided);
  if (!expected || providedBytes.length !== expectedBytes.length || !timingSafeEqual(providedBytes, expectedBytes)) { sendError(res, 'Unauthorized', 401); return; }
  try { sendSuccess(res, 'Communications processed', await processEmailOutbox(20)); } catch (error) { next(error); }
});
