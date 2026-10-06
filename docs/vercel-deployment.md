# Deploy GhanaTech Global as one Vercel project

The Vue website and Express API share one domain. Vercel serves `frontend/dist` and runs `api/index.js` for every `/api` request. Website routes such as `/join-talent` and `/admin/login` fall back to the Vue application; unknown API routes return JSON rather than the homepage.

## 1. Import the repository

Import https://github.com/Forson1211/GhanaTech-Global into Vercel.

| Setting | Value |
| --- | --- |
| Root directory | Repository root (leave empty) |
| Framework preset | Other |
| Node.js | 22.x |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `frontend/dist` |

These commands and routing are already configured in `vercel.json`. No second Vercel project is needed.

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
| `VITE_API_URL` | `/api` for development overrides; production always uses `/api` |

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

The frontend's Vite proxy sends `/api` to port 5000. Local development can keep `CV_STORAGE=local` in `backend/.env`. Set `CV_STORAGE=blob` with a private store token to test cloud uploads locally; application submission does not depend on a Blob webhook arriving.

Before pushing:

```sh
npm run build
npm test
```

The existing email notification service logs notifications. Hosting configuration does not enable an email provider or send confirmation emails.

References: [Node.js functions](https://vercel.com/docs/functions/runtimes/node-js), [Vite](https://vercel.com/docs/frameworks/frontend/vite), [private Blob storage](https://vercel.com/docs/vercel-blob/private-storage), [client uploads](https://vercel.com/docs/vercel-blob/client-upload).
