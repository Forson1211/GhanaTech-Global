import { env } from '../config/environment';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { User } from '../models/User';
import { SiteContent } from '../models/SiteContent';
import { SiteSettings } from '../models/SiteSettings';
import { compare } from 'bcryptjs';

let failures = 0;
function check(ok: boolean, label: string) {
  console.log(`${ok ? 'PASS' : 'MISSING'} ${label}`);
  if (!ok) failures++;
}
function publicOrigin(value: string | undefined) {
  try { const url = new URL(value || ''); return url.protocol === 'https:' && !/^(localhost|127\.|0\.|\[::1\])/.test(url.hostname) && !url.username && !url.password && url.pathname === '/' && !url.search && !url.hash; }
  catch { return false; }
}
async function main() {
  console.log('Production launch configuration (secret values are never printed):');
  check(/^mongodb(?:\+srv)?:\/\//.test(env.MONGODB_URI) && !/localhost|127\.0\.0\.1/.test(env.MONGODB_URI), 'Hosted MONGODB_URI');
  check(env.JWT_SECRET.length >= 32 && !/change|development|super_secret|your[-_]/i.test(env.JWT_SECRET), 'Unique JWT_SECRET');
  check(env.CV_STORAGE === 'blob' && !!env.BLOB_READ_WRITE_TOKEN, 'Private Blob storage configuration');
  check(publicOrigin(env.CLIENT_URL), 'HTTPS CLIENT_URL');
  check(publicOrigin(process.env.SITE_URL), 'HTTPS SITE_URL');
  check(env.CLIENT_URL === process.env.SITE_URL, 'Matching canonical and client origins');
  check((process.env.CRON_SECRET || '').length >= 32, 'CRON_SECRET of at least 32 characters');
  check(process.env.EMAIL_DELIVERY_ENABLED === 'true' && !!process.env.RESEND_API_KEY && /^[^\r\n]+@[^\r\n]+$/.test(process.env.EMAIL_FROM || ''), 'Enabled transactional email with sender and provider key');
  if (process.argv.includes('--database')) {
    try {
      await connectDatabase();
      check(true, 'Database connection');
      check(await User.countDocuments({ role: 'admin', isActive: true }) > 0, 'Active administrator');
      const demoUsers = await User.find({ email: { $in: ['admin@ghanatechglobal.com', 'recruiter@ghanatechglobal.com'] }, isActive: true }).lean();
      let demoPassword = false;
      for (const user of demoUsers) if (await compare(user.email.startsWith('admin@') ? 'AdminPass123!' : 'RecruiterPass123!', user.password)) demoPassword = true;
      check(!demoPassword, 'No active accounts with demo passwords');
      for (const kind of ['privacy', 'terms']) check(await SiteContent.countDocuments({ kind, status: 'published' }) > 0, `Published ${kind} policy`);
      const settings = await SiteSettings.findOne().lean();
      check(!!settings?.contactEmail && !!settings?.companyName, 'Saved business contact settings');
    } catch { check(false, 'Database inspection failed; check credentials and network access'); }
    finally { await disconnectDatabase(); }
  } else console.log('Database/content not inspected. Add --database to perform read-only checks.');
  console.log('Manual review still required: truthful public content, private store access, verified sender/domain, and live authenticated intake workflows.');
  process.exitCode = failures ? 1 : 0;
}
main().catch(() => { console.error('Launch check could not complete. Secret values omitted.'); process.exitCode = 1; });
