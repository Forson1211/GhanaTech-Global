# Deploy GhanaTech Global as one Vercel project

The Vue website and Express API share one domain through the existing Vercel Services configuration. The `frontend` service builds the Vite application; the `backend` service runs Express. Requests for `/api`, `/robots.txt`, and `/sitemap.xml` route to the backend. Website routes such as `/join-talent` and `/admin/login` fall back to the Vue application; unknown API routes return JSON rather than the homepage.

## 1. Import the repository

Import https://github.com/Forson1211/GhanaTech-Global into Vercel.

| Setting | Value |
| --- | --- |
| Root directory | Repository root (leave empty) |
| Framework preset | Services |
| Node.js | 22.x |
| Per-service frameworks | Express for `backend`, Vite for `frontend` |
| Root build/output overrides | Leave unset; each service owns its build |

The service roots, frameworks, bindings, routing, and daily communications schedule are configured in `vercel.json`. Select Services in the project's Build and Deployment settings; the `services` key alone does not enable this framework. No second Vercel project is needed. See [Vercel's Services guide](https://vercel.com/kb/guide/vercel-services).

## 2. Connect the database and private document storage

Create a MongoDB Atlas database and a database user. Permit connections from your Vercel deployment using Atlas network settings. Choose the appropriate network-access configuration for your account; use scoped database credentials.

In Vercel, open this project's Storage tab, create a **Private** Blob store, and connect it to the project. Vercel adds `BLOB_READ_WRITE_TOKEN`. A public Blob store is unsuitable for résumés.

Set these project environment variables before deploying:

| Variable | Value |
| --- | --- |
| `MONGODB_URI` | Your hosted MongoDB connection string, including the database name |
| `JWT_SECRET` | A unique random secret, at least 32 characters |
| `CV_STORAGE` | `blob` |
| `BLOB_READ_WRITE_TOKEN` | Added by the connected private Blob store |
| `CLIENT_URL` | Your production website origin, e.g. `https://your-domain.com` |
| `SITE_URL` | The same canonical production origin, for sitemap and robots URLs |
| `VITE_API_URL` | `/api` for development overrides; production always uses `/api` |
| `VITE_SITE_URL` | The canonical production origin, for browser metadata |
| `CRON_SECRET` | A random secret protecting the communications scheduler |

Apply the settings to Production and the Preview environments you intend to use. Prefer a separate database and Blob store for previews. Redeploy after changing environment variables. Never put database, JWT or Blob secrets into a `VITE_` variable or a committed file.

You can generate a secret locally with:

```sh
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## 3. Create your first administrator

The production deployment does not create demo accounts or run the destructive demo seed.

On your computer, configure `backend/.env` with the same hosted database, a production JWT secret, `NODE_ENV=production`, and your chosen `ADMIN_INITIAL_EMAIL`, `ADMIN_INITIAL_PASSWORD` (at least 12 characters), and optional `ADMIN_INITIAL_NAME`.

```sh
npm run create-admin --workspace backend
```

This creates one administrator and leaves existing data intact. Remove the initial administrator password from that local environment file afterward. Do not add it to Vercel environment settings; the live application does not need it.

Sign in at `/admin/login` and add your content through the dashboard. Existing local MongoDB data and disk uploads are not automatically moved to the hosted database or Blob store.

## 4. Deploy and verify

Deploy from Vercel's repository import, or after signing in:

```sh
vercel login
vercel --prod
```

Check:

- The homepage, a directly opened subpage, and a refreshed `/admin/login` load.
- `/api/health` returns a successful JSON response after database connection.
- `/api/does-not-exist` returns a JSON 404, not the website.
- A hiring request and newsletter signup are saved.
- A talent application accepts a PDF or Word résumé up to 10 MB.
- Signed-in recruiters can download résumés; unauthenticated requests cannot.
- Published jobs and approved content appear publicly; drafts stay private.
- `/robots.txt` and `/sitemap.xml` return the correct content and canonical domain.

## How résumé storage works

The candidate receives a short-lived, signed authorization for one randomly named document. The browser uploads it directly to the private Blob store, avoiding the function request-size limit. Submission verifies its path, size and document type against the signed ticket. An uploaded document can belong to only one application.

The browser retries a failed submission with its existing upload for 20 minutes. Unsubmitted uploads can remain in the store; review unclaimed objects against application storage keys before deleting them, according to your retention policy.

Downloads require recruiter authentication and stream through the protected API. Application deletion removes its stored document before deleting the database record, so storage failures can be retried.

## Development

```sh
npm ci
npm run dev:api
# In another terminal:
npm run dev
```

The frontend's Vite proxy sends `/api`, `/robots.txt`, and `/sitemap.xml` to port 5010. Keep `PORT=5010` in `backend/.env`, or set `DEV_API_TARGET` when intentionally using another API port. Local development can keep `CV_STORAGE=local`. Set `CV_STORAGE=blob` with a private store token to test cloud uploads locally; application submission does not depend on a Blob webhook arriving.

Before pushing:

```sh
npm run build
npm test
```

The communications worker is implemented but stays disabled until `EMAIL_DELIVERY_ENABLED=true`, `RESEND_API_KEY`, and a verified `EMAIL_FROM` are configured. Set `CRON_SECRET` for the protected daily schedule and confirm its authentication on the deployed project. See [launch setup](launch-checklist.md) for delivery, reminders, retry limits, publishing, and content prerequisites.

References: [Services](https://vercel.com/kb/guide/vercel-services), [Node.js functions](https://vercel.com/docs/functions/runtimes/node-js), [Vite](https://vercel.com/docs/frameworks/frontend/vite), [private Blob storage](https://vercel.com/docs/vercel-blob/private-storage), [client uploads](https://vercel.com/docs/vercel-blob/client-upload), [cron authentication](https://vercel.com/docs/cron-jobs/manage-cron-jobs).
