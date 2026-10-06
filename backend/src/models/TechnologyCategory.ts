import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnologyCategory extends Document {
  name: string;
  slug: string;
  description: string;
  icon?: string;
  status: 'published' | 'draft';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologyCategorySchema = new Schema<ITechnologyCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, required: true },
    icon: { type: String },
    status: { type: String, enum: ['published', 'draft'], default: 'published', index: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const TechnologyCategory = mongoose.model<ITechnologyCategory>('TechnologyCategory', TechnologyCategorySchema);
