import mongoose, { Schema } from 'mongoose';
const LoginActivitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  signedInAt: { type: Date, default: Date.now },
  device: { type: String, maxlength: 500 },
}, { timestamps: true });
LoginActivitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });
export const LoginActivity = mongoose.model('LoginActivity', LoginActivitySchema);
