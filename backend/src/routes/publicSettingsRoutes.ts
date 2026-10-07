import { Router } from 'express';
import { SiteSettings } from '../models/SiteSettings';
import { sendSuccess } from '../utils/response';
export const publicSettingsRoutes = Router();
export function publicSettings(settings: any) {
  const value = settings || new SiteSettings().toObject();
  const { companyName, tagline, contactEmail, supportPhone, accraOfficeAddress, usOfficeAddress, allowPublicApplications, allowLeadSubmissions, socialLinks } = value;
  return { companyName, tagline, contactEmail, supportPhone, accraOfficeAddress, usOfficeAddress, allowPublicApplications, allowLeadSubmissions, socialLinks: socialLinks || {} };
}
publicSettingsRoutes.get('/', async (_req, res, next) => {
  try { sendSuccess(res, 'Public site settings', publicSettings(await SiteSettings.findOne().lean())); } catch (error) { next(error); }
});
