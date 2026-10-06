import { Router } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';
import { sendError, sendSuccess } from '../utils/response';

const router = Router();
const subscribeSchema = z.object({ email: z.string().trim().max(254).email().toLowerCase() });

router.post('/subscribe', async (req, res, next) => {
  const result = subscribeSchema.safeParse(req.body);
  if (!result.success) {
    sendError(res, 'Please enter a valid email address.', 400);
    return;
  }
  if (mongoose.connection.readyState !== 1) {
    sendError(res, 'Subscriptions are temporarily unavailable. Please try again shortly.', 503);
    return;
  }
  try {
    await NewsletterSubscriber.updateOne(
      { email: result.data.email },
      { $setOnInsert: { email: result.data.email } },
      { upsert: true, runValidators: true }
    );
    sendSuccess(res, 'Thanks for subscribing!');
  } catch (error) {
    // Concurrent subscriptions to the same email still count as a successful signup.
    if ((error as { code?: number }).code === 11000) {
      sendSuccess(res, 'Thanks for subscribing!');
      return;
    }
    next(error);
  }
});

export default router;
