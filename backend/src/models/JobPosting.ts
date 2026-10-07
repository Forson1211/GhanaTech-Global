import mongoose, { Schema } from 'mongoose';
const JobPostingSchema = new Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  type: { type: String, required: true },
  location: { type: String, default: 'Remote — Ghana' },
  salary: { type: String, default: 'Discussed during matching' },
  description: { type: String, required: true },
  responsibilities: [String], requirements: [String], techStack: [String],
  status: { type: String, enum: ['draft', 'published', 'closed'], default: 'draft', index: true },
  closesAt: Date,
}, { timestamps: true });
export const JobPosting = mongoose.model('JobPosting', JobPostingSchema);
