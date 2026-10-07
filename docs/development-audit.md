# GhanaTech Global development audit

The existing Vue 3 / Tailwind frontend, Express API, MongoDB models, authentication, private CV storage, and admin pages were extended. The homepage design was preserved, with the user's requested change placing the three opportunity steps before the Ghana-to-U.S. career section. The navbar has exactly five main tabs: Solutions, Employers, Talents, About, and Contact. Desktop dropdowns and mobile accordions share the requested links and existing styling. Leadership and Insights now have functioning pages backed by an admin publishing tool; they show empty states until approved content is published.

## Completed

- Employer intake: exact headcount, a custom position, skills, experience level, employment type, start date, job description, and direct placement / managed talent / technology project / not sure engagement options.
- Talent intake: first/last name, city, employment status, education, certifications, skill checklists, multiple employment preferences, and required authorization. Consent date and policy version are recorded server-side.
- Private PDF/DOC/DOCX uploads retain the existing storage and download authorization. A new application requires a CV. Quick apply sends the actual API fields and displays failures honestly.
- Six technology areas are represented in role browsing and form choices, including IT and business technology.
- Employer CRM and talent ATS stages extend existing status fields. Legacy stages remain valid. Status changes record dates and recruiter IDs.
- Discovery and placement dates, 30/60/90-day follow-up due dates, and completion checkboxes use the existing employer details modal.
- Contact messages persist as company inquiries in the existing lead collection. Platform settings persist and submission flags are enforced server-side.
- Admin service, candidate, lead, FAQ, testimonial, statistic, and calculator clients match existing API routes. Pagination and calculator result shapes are normalized. Authentication verification uses /auth/me.
- Calculator editing updates the selected record by ID, including when its role or seniority changes.
- Published service data populates the existing service layouts. Approved public candidate profiles retain privacy exclusions and no longer fabricate fallback identities.
- Managed Teams, For Talent, Industries, and an available talent directory reuse existing page styles and components. New pages have titles and descriptions.
- Job Openings supports draft, published, closed, and expired vacancies. Public job cards read real records. Applications retain a vacancy ID; the server rejects closed vacancies and resolves role/category from the vacancy. Rejected local submissions remove their uploaded CVs.
- Pages & Articles supports leadership biographies, Insights articles, Privacy Policy, and Terms of Use with drafts, publishing, ordering, and safe plain-text rendering.
- My Account supports profile updates, current-password-verified password changes, and successful sign-in history with a 90-day retention period. The existing admin interface has English, French, and Spanish labels.
- Saved contact details and social links populate the public contact page and footer. Only approved public settings are returned by the public API.
- Employer, candidate, and discovery confirmations use a persistent outbox. The Resend delivery adapter, atomic queue worker, bounded retries, provider idempotency, staff placement reminders, communications dashboard, and protected scheduled endpoint are implemented. Delivery stays disabled until configured.
- Canonical links, page descriptions, default social-sharing metadata, robots rules, and a sitemap cover public pages and published content. Empty editorial pages and admin pages use noindex.
- Local login reaches the GhanaTech API on port 5010. Another application owns port 5000; it was left running. Vite's API proxy and explicit TypeScript config selection now use the correct backend.

## Integration and content still needed

- Email delivery needs a server-side provider key, verified sender, and explicit enablement. Existing messages remain pending_configuration; local tests used mocked delivery and sent no actual email.
- External CRM/ATS synchronization is not connected. The existing records, statuses, timestamps, and histories are ready for an adapter when a provider is chosen.
- Leadership biographies, Insights articles, confirmed openings, and approved legal policies are not available yet. None were invented or published. Publish them through the existing dashboard when approved.
- Production database, private CV storage, administrator, domain, and email environment settings must be confirmed on the actual host. A live URL has not been supplied, so deployed login and delivery cannot yet be verified.
- Social crawlers that do not execute JavaScript receive default site metadata. Article-specific sharing previews would require prerendering or server-side rendering.

## Verification

Run npm test from the repository root, and npm run build for production builds. The intake/workflow tests verify consent, structured hiring requirements, CV requirements, disabled submission flags, persisted contact requests, stage history, follow-up scheduling, and prepared confirmations. Frontend API contract tests cover routes, pagination, calculator results, authentication verification, publishing, and ordering. Existing animation/statistics and deployment/private-CV checks remain in the suite.

Verified locally: production frontend and backend builds, backend/frontend/deployment regression tests, and an opt-in persistence integration test using a separate temporary MongoDB database. The integration test covers authentication/history, publishing visibility, canonical vacancy fields, CV access and cleanup, contacts/leads/newsletter, outbox records, placement reminders, settings, and password changes. It removes its own fixtures and uploaded files.

Headless-browser checks verified local sign-in, all existing admin pages, account history, job/content draft creation and deletion, modal cancellation, unconfigured communications controls, French/Spanish account labels, public settings, real-job empty states, and public content pages. Navigation checks verified five-tab desktop/mobile ordering, dropdown destinations, Escape dismissal, and menu closure. Checked public pages fit a 390px viewport without horizontal overflow; no uncaught browser exceptions were observed. Temporary publishing fixtures were deleted.

See [launch setup](launch-checklist.md) for configuration and live-site verification steps.

The admin sidebar uses plain-language labels with matching page headings, including Candidate Profiles, Job Applications, Company Requests, Job Openings, Pages & Articles, Emails & Subscribers, My Account, Job Categories, Cost Calculator, Customer Reviews, Common Questions, Homepage Numbers, and Website Settings. All 15 destinations were checked in the browser, including French/Spanish labels and mobile sizing.
