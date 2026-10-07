import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  companyName: string;
  tagline: string;
  contactEmail: string;
  supportPhone: string;
  accraOfficeAddress: string;
  usOfficeAddress: string;
  allowPublicApplications: boolean;
  allowLeadSubmissions: boolean;
  socialLinks?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    companyName: { type: String, default: 'GhanaTech Global' },
    tagline: { type: String, default: 'U.S.–Ghana Technology Talent & Services' },
    contactEmail: { type: String, default: 'advisors@ghanatechglobal.com' },
    supportPhone: { type: String, default: '+1 (726) 227-2605' },
    accraOfficeAddress: { type: String, default: 'Airport Residential Area, Accra, Ghana' },
    usOfficeAddress: { type: String, default: 'Austin, TX & New York, NY' },
    allowPublicApplications: { type: Boolean, default: true },
    allowLeadSubmissions: { type: Boolean, default: true },
    socialLinks: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
