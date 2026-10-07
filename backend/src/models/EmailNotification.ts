import mongoose, { Schema } from 'mongoose';
// Durable outbox for a future email-provider worker. Nothing is marked sent here.
const EmailNotificationSchema = new Schema({
  sourceId: { type: String, required: true },
  kind: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  status: { type: String, enum: ['pending_configuration', 'queued', 'processing', 'sent', 'failed'], default: 'pending_configuration', index: true },
  attempts: { type: Number, default: 0 },
  lockedAt: Date,
  firstAttemptAt: Date,
  nextAttemptAt: Date,
  lastError: String,
  providerId: String,
  sentAt: Date,
}, { timestamps: true });
EmailNotificationSchema.index({ sourceId: 1, kind: 1 }, { unique: true });
EmailNotificationSchema.index({ status: 1, nextAttemptAt: 1 });
export const EmailNotification = mongoose.model('EmailNotification', EmailNotificationSchema);
