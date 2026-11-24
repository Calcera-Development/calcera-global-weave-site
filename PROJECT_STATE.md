# CalceraWebsite — Project State

Last updated: 2026-11-24. Living document — update it (don't just append) when a real decision, gotcha, or open item changes.

## 1. What this is

Calcera's own marketing site (Vite/React, originally Lovable-scaffolded). SEO work: `SEO_HANDOVER.md`. Calcera's own property, not client work, but still deploys to production — treat deploys with the same care as client repos.

## 2. Recent focus (as of last update)

Redesigned around a minimalist, single-blue-accent B2B brand; a prior UI overhaul (stats bar, redesigned sections); lint cleanup and deprecated-icon fixes. Removed the `/ai-diagnostic` page and all entry points to it (hero CTA, header nav, floating button) — see work log below.

## 3. Known open items

- Confirm what the "test automated push"/"test git push and vercel deployment" commits (`069675d`, `1e3294f`, `97a8753`) were verifying, and whether that setup is still in the state those commits left it in.
- The `ai-diagnostic` and `send-diagnostic-report` Supabase edge functions (`supabase/functions/`) are still deployed and callable even though nothing in the frontend links to them anymore. Undeploying those needs separate Supabase dashboard/CLI access — not done as part of the frontend removal.
- `.env` is committed to the repo with live secret keys (`AI_API_KEY`, `RESEND_API_KEY`) — flagged previously, still unresolved. Rotate the keys and untrack the file before giving anyone else repo access.
- **Analytics (added 2026-11-24, not yet live):** Vercel Web Analytics is wired in code but must be switched on in the Vercel dashboard (Project → Analytics → Enable), or nothing is recorded. Custom events (see below) are only collected on Vercel Pro or higher; page views work on Hobby.
- Privacy Policy doesn't mention analytics yet. Vercel Analytics is cookieless and stores no personal data, but a one-line disclosure is good practice for UK/EU visitors.
- Direct pushes to `main` currently deploy straight to production with no PR/review step. Worth branch-protecting `main` before handing work to anyone else.

## 4. Recent work log

- 2026-11-24: Added Vercel Web Analytics (`@vercel/analytics`), chosen over GA4 because it's cookieless and so needs no consent banner for UK/EU traffic. `<Analytics />` in `App.tsx` handles page views, including SPA route changes. Custom events go through the typed `trackEvent` helper in `src/lib/analytics.ts` (never put PII in properties): `contact_form_submitted`, `contact_form_failed {reason}`, `contact_link_clicked {method}`, `book_consultation_clicked {location}`. The script and beacons are same-origin (`/_vercel/insights/*`), so the CSP in `vercel.json` needed no changes. Verified in dev via the package's debug console logs; it does not send data from localhost.

- 2026-11-19: Removed the `/ai-diagnostic` page per request (it was live at calcera.global/ai-diagnostic). Deleted the page, its form/dashboard/sub-components, the floating CTA button, and the route in `App.tsx`; removed the links from the hero and mobile nav. The two Supabase edge functions backing it were intentionally left alone (outside this repo's deploy surface) — see open items.
- 2026-11-19: Fixed npm audit findings (GitHub reported 52, local `npm audit` reported 22 — same underlying issues, GitHub counts duplicate advisory paths separately). `npm audit fix` handled most; force-bumped `zod` 3.24.1 → 4.6.7 (major, unused directly in `src/`, verified clean via typecheck/build/smoke test). Down to 0 locally. One residual: `minimatch` nested inside `typescript-eslint`'s own tree — devDependency only, no newer compatible version published yet, left as-is.
