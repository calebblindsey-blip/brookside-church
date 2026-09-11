# Brookside Church of God — Website

Redesign + migration of [brooksidechurchofgod.com](https://brooksidechurchofgod.com)
off Squarespace onto Cloudflare Pages.

**Stack:** Astro 5 · TypeScript · hand-written CSS (`src/styles/site.css`, the
Codex "Direction B" design ported 2026-09) · Instrument Serif (display) + DM Sans
Variable (body), both self-hosted via `@fontsource`
**Hosting:** Cloudflare Pages (free), static output, no adapter, one Pages Function
**Podcast host:** Spotify for Creators (migrated 2026-07, Apple approved)

Design doc, church facts, cutover runbook and project tracker live in the Compass repo:
`projects/personal/brookside-church-website/`. The `brookside-site` skill there
carries the verification ritual and the environment traps.

## Local dev

```bash
npm install
npm run dev       # http://localhost:4321  (no /api/live here; see below)
npm run build     # static build to dist/
npm run preview   # serve the built site locally
npm run sermons   # regenerate src/data/sermons.json from the live RSS feed
npm run live      # regenerate src/data/live.json + public/live-poster.webp from YouTube
```

`/api/live` is a Pages Function, so `astro dev` does not serve it. To exercise the
whole thing locally, build and run `npx wrangler pages dev dist --port 8788`, which
runs the real redirect, header and function engine.

## Structure

```
src/
  components/     SiteHeader, SiteFooter, InteriorHero, Times, Motion (the motion
                  island: reduced-motion, the home page current, scroll reveals),
                  ChurchSchema + PodcastSchema (JSON-LD)
  layouts/        SiteLayout — the one shell every page uses (head, chrome, GA4)
  pages/          index, visit, watch, about, give, what-we-believe, knowing-christ, 404
  data/           church.ts (the sourced facts, one copy), sermons.json and
                  live.json (generated, do not hand-edit)
  styles/         site.css
functions/api/    live.js — is the channel streaming right now
public/           favicon set, og image, portraits, robots.txt, _headers,
                  _redirects, _routes.json
scripts/          pull-sermons.mjs, pull-live.mjs
.github/workflows weekly-refresh.yml — Monday pull, build, deploy (see below)
```

Every fact about the church (address, phone, email, service names and times)
comes from `src/data/church.ts`, which mirrors `church-facts.md` in Compass.
Anything not confirmed by someone at the church stays off the site.

## Deploy

Direct upload, not the Git integration: the deploy ships the `dist/` that was
just built and verified locally rather than depending on Cloudflare's build
runner. `wrangler.toml` carries the project name and output directory, so there
are no flags and no dashboard build settings.

```bash
npx wrangler login            # once per machine
npm run deploy:preview        # build + deploy to a preview branch URL
npm run deploy                # build + deploy to production
```

**The site is deployed and live on `brookside-church.pages.dev`, but it is not yet
the public website.** The domains are still on Squarespace; the DNS cutover has not
happened. Check what production is on with
`npx wrangler pages deployment list --project-name brookside-church` rather than
trusting a number written here.

**Build with `rm -rf dist` first.** The repo sits under iCloud-synced `~/Documents`, and
iCloud writes conflict copies (`visit/index 2.html`, mode 600) into `dist/` at build time.
Astro does not purge unknown files and this deploy uploads the directory wholesale, so a
stale `dist/` ships junk. Read the file count off the build; `find dist -name "* 2.*"`
must be empty.

Things that trip people up here:

- **Deploy with no `CLOUDFLARE_API_TOKEN` set.** Setting the variable *overrides*
  the working OAuth session cached in
  `~/Library/Preferences/.wrangler/config/default.toml`. `npx wrangler pages deploy
  --branch main` with no env var works.
- **`--branch main` is the Cloudflare production-environment label, not the git
  branch.** All work lives on `redesign`, which is the repo's default branch;
  git `main` is the April scaffold. A fresh clone of `main` is not this site.
- **The weekly refresh is GitHub Actions**, `.github/workflows/weekly-refresh.yml`,
  Mondays 11:00 UTC plus manual dispatch. It pulls the feed and the stream, builds,
  refuses to deploy under the page-count floor, deploys, verifies, and commits the
  data. Schedules only see workflows on the default branch, which is why `redesign`
  is the default.

Both domains carry Microsoft 365 email, so the DNS cutover is the risky part and
has its own step-by-step: `projects/personal/brookside-church-website/dns-cutover-runbook.md`
in the Compass repo. Read it before changing a nameserver.

### What ships alongside the HTML

- `public/_redirects` — the old Squarespace URLs. Ten real pages and 292 podcast
  episode URLs are indexed today; without this file the cutover turns the
  church's whole search presence into 404s.
- `public/_headers` — security headers and immutable caching for `/_astro/*`.
  What is deliberately *not* set (HSTS, CSP) is documented in the file.
- `public/_routes.json` — confines the Function to `/api/*` so every page stays a
  static file served off the edge.

## Verification

From the Compass repo root, against `wrangler pages dev dist --port 8788` (so
`/api/live` answers and `/watch` can reach exit 0):

```bash
# Page audit: cached Chrome for Testing. Read the build number off
# ~/Library/Caches/ms-playwright/ rather than trusting the one below.
PW_CHROME="$HOME/Library/Caches/ms-playwright/chromium-<build>/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing" \
  node engine/scripts/audit-brookside-site.mjs http://localhost:8788/visit/

# Deck check: drives real audio on /watch and asserts SEEK, not just play.
# Needs the branded Chrome; plain Chromium has no MP3 decoder.
PW_CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  node engine/scripts/verify-brookside-deck.mjs http://localhost:8788/
```

The audit needs a per-page selector set and refuses to run on a page it does not
know, so add one to its `PAGES` map when adding a page. Review screenshots come
from `projects/personal/brookside-church-website/reviews/capture-for-review.mjs`;
a screenshot of this site taken any other way is not evidence (see its header).
