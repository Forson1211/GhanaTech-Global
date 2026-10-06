import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  quote: string;
  photo?: string;
  rating?: number;
  status: 'published' | 'draft';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    quote: { type: String, required: true },
    photo: { type: String },
    rating: { type: Number, default: 5 },
    status: { type: String, enum: ['published', 'draft'], default: 'published', index: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
