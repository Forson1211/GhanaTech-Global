import mongoose, { Schema, Document } from 'mongoose';

export interface IStatistic extends Document {
  key: string;
  value: string;
  label: string;
  description?: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StatisticSchema = new Schema<IStatistic>(
  {
    key: { type: String, required: true, unique: true, trim: true, index: true },
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    description: { type: String },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const Statistic = mongoose.model<IStatistic>('Statistic', StatisticSchema);
