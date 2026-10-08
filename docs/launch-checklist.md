# GhanaTech Global launch setup

The existing visual design remains in place. Vite starts at `http://localhost:5173` and selects the next available port if needed; use the URL printed in the terminal. The GhanaTech API uses `http://localhost:5010`; Vite forwards `/api` to that API. Run both with `npm.cmd run dev:all` from the repository root, or use `npm run dev:api` and `npm run dev` in separate terminals. The frontend scripts explicitly load `vite.config.ts` to avoid stale generated JavaScript configuration.

## Launch status and automated checks

Local validation is separate from production launch. Production credentials, an authenticated hosting account, the canonical domain, a real administrator, and approved business content are required to finish launch. Example testimonial fallbacks have been removed; the public reviews section stays hidden until published records load.

Inspection on October 8, 2026 found two existing Services projects: `ghanatech-global-iu6d` (`https://ghanatechglobal.vercel.app`) and `ghanatech-global` (`https://ghanatech-global.vercel.app`). Both returned HTTP 500 for `/api/health` and HTTP 404 for `/admin/login`; neither had project environment variables configured. The user selected `ghanatechglobal.vercel.app`, and the workspace is linked to `ghanatech-global-iu6d`. Supply hosted database/private storage/email configuration before completing production launch. Local database checks found active demo-password accounts and no published privacy or terms policies; the local database must not be treated as production-ready content.

The user explicitly approved production setup on October 8, 2026 after saving the Atlas connection and providing the administrator email. Production is now deployed at **https://ghanatechglobal.vercel.app**, using deployment `dpl_7tA2V8pvzqPk9B6ng3Ryj6L8ohNR`. Atlas connectivity and all 16 models' additive database index initialization succeeded. Private Blob store `ghanatech-private-cvs` is connected to Production. Unique JWT/cron secrets and canonical URL settings are configured. Email delivery remains disabled as requested; Resend is deferred.

The active administrator is **ghanatechglobal@gmail.com**. The generated password is saved only for local handoff in the ignored `.tmp/production-admin.json`; sign in at `/admin/login` and change it in My Account. A one-time production build initialized indexes and created the administrator without demo seeding. Its `PRODUCTION_BOOTSTRAP_ENABLED`, `ADMIN_INITIAL_EMAIL`, and `ADMIN_INITIAL_PASSWORD` settings were removed, and the final deployment was rebuilt without them. The bootstrap helper has no HTTP endpoint and only runs when explicitly enabled for a production build.

Live verification passed for public SPA pages, API health, JSON 404 responses, unauthenticated account rejection, public listings, robots, and sitemap. Administrator login, secure HttpOnly cookies, account identity, dashboard, applications list, communications dashboard, direct CV upload configuration, and unauthenticated CV download rejection passed. A temporary private Blob upload could be read with authorization and could not be read anonymously; it was deleted after verification. No email was sent and no demo applicants were created. Live submission-to-CV-download workflows still need verification before accepting personal data.

Remaining business launch work: supply and review accurate public contact/office details, publish approved privacy and terms policies, and add real services, jobs, leadership, and other content as appropriate. These records were not invented or migrated from the local demo database. Resend sender setup and inbox delivery verification remain deferred. The Tailwind build-tool advisories below also remain open. The site is deployed and the backend works, but this checklist does not certify a completed business launch.

Preview testing found that Services requires the SPA rewrite inside `services.frontend.rewrites` and the detected `src/app.ts` entrypoint must export its Express app by default. Runtime logs also exposed missing packages in the generated root-level bundle; root runtime dependencies now match the backend manifest. The deprecated Multer 1 upload parser was upgraded to Multer 2.4. Initial database index creation uses the additive `initialize-db` command, never demo seeding.

Verified preview: https://ghanatech-global-iu6d-d6t9brd2u-forson-odonkors-projects.vercel.app (deployment `dpl_3EjrmeQG1LxW32AHdHhEmKBpcef1`). Authenticated Vercel checks returned HTTP 200 for `/admin/login`, `/join-talent`, and the main JavaScript asset, with the expected content types. `/api/health` returned a no-cache JSON 503 for missing configuration, confirming the function starts successfully. This is not a healthy configured backend yet. The separate isolated database integration test passed after the dependency changes. `npm audit --omit=dev --audit-level=moderate` reported zero production runtime vulnerabilities; the full audit still reports seven build-tool advisories in the Tailwind 3 dependency chain, requiring a separately validated toolchain update.

The code now includes the frontend service's SPA fallback and retryable JSON 503 handling for a Vercel API whose startup configuration or database is unavailable. These fixes require deployment to affect the existing live URLs. Production statistics also stay hidden until published records load, rather than falling back to example numbers. Business review is still required for any records that are already published.

Use [production-env.example](production-env.example) as the host configuration reference. Keep real credentials in the hosting dashboard or an ignored environment file, never in this reference.

```powershell
# Inspect configuration without printing secret values:
npm.cmd run launch:check
# Also inspect the configured database without modifying records:
npm.cmd run launch:check -- --database
# Read-only checks against the production URL after deployment:
npm.cmd run launch:smoke -- https://your-domain.com
```

The configuration check exits unsuccessfully if required values are missing. The optional database check verifies an active administrator, absence of known demo passwords, published policies, and saved contact settings. It does not certify legal wording or contact accuracy. The smoke check verifies HTML subpages, API responses, denied unauthenticated account access, public listings, canonical robots rules, and the sitemap. It creates no accounts, submits no forms, and sends no email. Private Blob access, sender verification, administrator login, saved submissions, CV upload/download, and email receipt still need live workflow verification.

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
