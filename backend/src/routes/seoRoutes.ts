import { Router } from 'express';
import { SiteContent } from '../models/SiteContent';
import { Service } from '../models/Service';
export const seoRoutes = Router();
const escapeXml = (value: string) => value.replace(/[<>&"']/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[character]!));
export function siteOrigin() {
  const configured = process.env.SITE_URL || process.env.CLIENT_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : 'http://localhost:5174');
  return new URL(configured).origin;
}
seoRoutes.get('/robots.txt', (_req, res) => {
  const isPreview = process.env.VERCEL_ENV === 'preview';
  res.type('text/plain').send(isPreview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nDisallow: /admin\nDisallow: /api/\nAllow: /\nSitemap: ${siteOrigin()}/sitemap.xml\n`);
});
seoRoutes.get('/sitemap.xml', async (_req, res, next) => {
  try {
    const paths = ['/', '/about', '/talent', '/talent-directory', '/hire-talent', '/jobs', '/join-talent', '/services', '/managed-teams', '/for-talent', '/industries', '/how-it-works', '/why-ghana', '/contact', '/faq'];
    const [records, services] = await Promise.all([SiteContent.find({ status: 'published' }).select('kind slug').lean(), Service.find({ status: 'published' }).select('slug').lean()]);
    for (const record of records) paths.push(record.kind === 'insight' ? '/insights/' + record.slug : '/' + record.kind);
    for (const service of services) paths.push('/services/' + encodeURIComponent(service.slug));
    if (records.some(record => record.kind === 'insight')) paths.push('/insights');
    const urls = [...new Set(paths)].map(path => `<url><loc>${escapeXml(siteOrigin() + path)}</loc></url>`).join('');
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  } catch (error) { next(error); }
});
