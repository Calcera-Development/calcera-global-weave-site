# CalceraWebsite — Project State

Last updated: 2026-09-24. Living document — update it (don't just append) when a real decision, gotcha, or open item changes.

## 1. What this is

Calcera's own marketing site (Vite/React, originally Lovable-scaffolded). SEO work: `SEO_HANDOVER.md`. Cross-project conventions: `../calcera-ops/CONVENTIONS.md`. Calcera's own property, not client work, but still deploys to production — treat deploys with the same care as client repos.

## 2. Recent focus (as of last update)

Redesigned around a minimalist, single-blue-accent B2B brand; a prior UI overhaul (stats bar, redesigned sections); lint cleanup and deprecated-icon fixes. A few commits are literally titled "test automated push"/"testing full push over SSH" — worth understanding what those were testing before assuming the current SSH/deploy setup is fully proven out.

## 3. Known open items

- Confirm what the "test automated push"/"test git push and vercel deployment" commits (`069675d`, `1e3294f`, `97a8753`) were verifying, and whether that setup is still in the state those commits left it in.

## 4. Recent work log

Use this section going forward for decisions, gotchas, or unfinished work a future session needs to know about.
