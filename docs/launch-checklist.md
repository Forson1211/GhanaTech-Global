# GhanaTech Global launch setup

The existing visual design remains in place. Local development uses the website at `http://localhost:5174` and the GhanaTech API at `http://localhost:5010`; Vite forwards `/api` to that API. Port 5000 belongs to another local application. Run `npm run dev:api` and `npm run dev` in separate terminals. The frontend scripts explicitly load `vite.config.ts` to avoid stale generated JavaScript configuration.

## Publishing and account tools

- **My Account** (`/admin/account`): edit your name/email, change your password with the current password, and see recent sign-ins. New passwords require 12 characters. Sign-in records expire after 90 days.
- **Job Openings** (`/admin/jobs`): create drafts, publish vacancies, set a closing date, edit requirements/skills, or close a vacancy. Only published, unexpired jobs appear publicly. Submitted applications retain the vacancy ID, and the API verifies the vacancy is still open.
- **Pages & Articles** (`/admin/content`): draft and publish leadership biographies, Insights articles, Privacy Policy, and Terms of Use. Content is plain text with paragraphs; raw HTML is not rendered. Policies have stable public addresses. Publish policies only once the business has reviewed and approved their wording.
- **Website Settings** (`/admin/settings`): save contact details, office addresses, social URLs, and intake flags. The public contact page and footer read those saved details. Confirm the existing business details and social URLs before launch.
- **Emails & Subscribers** (`/admin/communications`): review confirmation messages, placement reminders, provider failures, and newsletter subscribers. The queue-processing button stays disabled until delivery is configured and enabled.

No biographies, articles, verified vacancies, or legal policies have been invented or published. Their pages show an empty state until approved records are published. Empty content pages are marked noindex; published content enters the sitemap. Existing testimonials and candidate records also need business review before using them in production.

## Transactional email

The implemented provider adapter uses [Resend's send-email API](https://resend.com/docs/api-reference/emails/send-email). Set these **server-side** environment variables:

```dotenv
EMAIL_DELIVERY_ENABLED=true
RESEND_API_KEY=your-server-side-api-key
EMAIL_FROM=GhanaTech Global <your-verified-sender@your-domain.com>
CRON_SECRET=your-random-scheduling-secret
```

Until configured, messages remain in MongoDB and nothing is sent. Configured intake submissions attempt their own confirmations immediately. The queue worker atomically claims messages, uses stable provider idempotency keys, tracks attempts and provider IDs, and keeps failures visible. A message marked sent was accepted by the provider; it is not an inbox-delivery receipt.

Process waiting messages and due 30/60/90-day staff reminders through the dashboard or:

```sh
npm run process-emails --workspace backend
```

`vercel.json` schedules the protected `/api/cron/communications` endpoint daily at 08:00 UTC. The platform must supply the matching `CRON_SECRET` authorization. For more frequent processing, configure a compatible schedule for your hosting plan or run the worker with your own scheduler. Automatic retry attempts stop after five attempts or 23 hours from the first attempt; inspect provider logs before resending a message outside that window to avoid duplicating an uncertain delivery.

Newsletter subscriptions are stored and visible in the admin portal. This implementation does not send marketing campaigns or synchronize with an external CRM/ATS.

## Production environment

The repository uses Vercel services for the Express backend and Vite frontend, with same-origin `/api` routing. Follow [the deployment guide](vercel-deployment.md) for MongoDB and private CV storage. Required launch configuration:

```dotenv
# Backend
MONGODB_URI=your-hosted-database-connection
JWT_SECRET=your-unique-secret-of-at-least-32-characters
CV_STORAGE=blob
BLOB_READ_WRITE_TOKEN=your-private-blob-store-token
CLIENT_URL=https://your-domain.com
SITE_URL=https://your-domain.com

# Frontend
VITE_API_URL=/api
VITE_SITE_URL=https://your-domain.com
```

Keep backend secrets out of `VITE_` variables. Create a real administrator using the existing `create-admin` command, and avoid running the destructive demo seed against the hosted database. Local data and uploads are not migrated automatically.

The robots endpoint excludes admin/API paths and blocks preview deployments. The sitemap includes public routes, published services, and published editorial/policy content. Browser navigation updates canonical links and Open Graph/Twitter metadata. The initial HTML contains default site-sharing metadata; article-specific previews from crawlers that do not execute JavaScript would require prerendering or server-side rendering.

## Verification

```sh
npm run build
npm test
```

Optional persistence integration test (uses a separate temporary local MongoDB database and cleans up its own data/uploads):

```powershell
$env:RUN_DB_INTEGRATION = 'true'
node --test backend/tests/launch-integration.test.cjs
```

After production configuration, verify the live URL: health check, admin sign-in, refreshed subpages, employer/contact/newsletter submissions, candidate application with CV, protected CV downloads, email provider acknowledgement, published job visibility, and robots/sitemap URLs. Local verification does not establish the condition of an unknown deployed URL.
