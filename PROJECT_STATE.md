# CalceraWebsite — Project State

Last updated: 2026-11-19. Living document — update it (don't just append) when a real decision, gotcha, or open item changes.

## 1. What this is

Calcera's own marketing site (Vite/React, originally Lovable-scaffolded). SEO work: `SEO_HANDOVER.md`. Calcera's own property, not client work, but still deploys to production — treat deploys with the same care as client repos.

## 2. Recent focus (as of last update)

Redesigned around a minimalist, single-blue-accent B2B brand; a prior UI overhaul (stats bar, redesigned sections); lint cleanup and deprecated-icon fixes. Removed the `/ai-diagnostic` page and all entry points to it (hero CTA, header nav, floating button) — see work log below.

## 3. Known open items

- Confirm what the "test automated push"/"test git push and vercel deployment" commits (`069675d`, `1e3294f`, `97a8753`) were verifying, and whether that setup is still in the state those commits left it in.
- The `ai-diagnostic` and `send-diagnostic-report` Supabase edge functions (`supabase/functions/`) are still deployed and callable even though nothing in the frontend links to them anymore. Undeploying those needs separate Supabase dashboard/CLI access — not done as part of the frontend removal.
- `.env` is committed to the repo with live secret keys (`AI_API_KEY`, `RESEND_API_KEY`) — flagged previously, still unresolved. Rotate the keys and untrack the file before giving anyone else repo access.
- Direct pushes to `main` currently deploy straight to production with no PR/review step. Worth branch-protecting `main` before handing work to anyone else.

## 4. Recent work log

- 2026-11-19: Removed the `/ai-diagnostic` page per request (it was live at calcera.global/ai-diagnostic). Deleted the page, its form/dashboard/sub-components, the floating CTA button, and the route in `App.tsx`; removed the links from the hero and mobile nav. The two Supabase edge functions backing it were intentionally left alone (outside this repo's deploy surface) — see open items.
