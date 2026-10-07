import mongoose, { Schema } from 'mongoose';
const SiteContentSchema = new Schema({
  kind: { type: String, enum: ['leadership', 'insight', 'privacy', 'terms'], required: true, index: true },
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true },
  summary: { type: String, default: '' },
  body: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  author: { type: String, default: '' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
}, { timestamps: true });
SiteContentSchema.index({ kind: 1, slug: 1 }, { unique: true });
export const SiteContent = mongoose.model('SiteContent', SiteContentSchema);
