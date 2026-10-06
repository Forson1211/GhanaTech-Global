import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  capabilities: string[];
  image?: string;
  status: 'published' | 'draft';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, required: true },
    capabilities: [{ type: String, trim: true }],
    image: { type: String },
    status: { type: String, enum: ['published', 'draft'], default: 'published', index: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);
