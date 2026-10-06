import mongoose, { Schema, Document } from 'mongoose';

export interface ICalculatorConfig extends Document {
  role: string;
  seniority: 'Junior' | 'Mid-Level' | 'Senior';
  usEstimatedAnnualCost: number;
  ghanaTechEstimatedAnnualCost: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CalculatorConfigSchema = new Schema<ICalculatorConfig>(
  {
    role: { type: String, required: true, trim: true },
    seniority: { type: String, enum: ['Junior', 'Mid-Level', 'Senior'], required: true },
    usEstimatedAnnualCost: { type: Number, required: true },
    ghanaTechEstimatedAnnualCost: { type: Number, required: true },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

CalculatorConfigSchema.index({ role: 1, seniority: 1 }, { unique: true });

export const CalculatorConfig = mongoose.model<ICalculatorConfig>('CalculatorConfig', CalculatorConfigSchema);
