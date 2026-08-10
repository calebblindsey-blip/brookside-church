# Brookside Church of God — Website

Redesign + migration of [brooksidechurchofgod.com](https://brooksidechurchofgod.com)
off Squarespace onto Cloudflare Pages.

**Stack:** Astro 5 · TypeScript · Tailwind v4 · Bricolage Grotesque + Public Sans + JetBrains Mono
**Hosting:** Cloudflare Pages (free), static output, no adapter
**Podcast host:** Spotify for Creators (migrated 2026-07, Apple approved)

Design doc, cutover runbook and project tracker live in the Compass repo:
`projects/personal/brookside-church-website/`.

## Local dev

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static build to dist/
npm run preview   # serve the built site locally
npm run sermons   # regenerate src/data/sermons.json from the live RSS feed
```

## Structure

```
src/
  components/     SiteHeader, SiteFooter, Thread (the line), BrooksideMark
  layouts/        SiteLayout (current), BaseLayout (legacy, /design-system only)
  pages/          index, visit, watch, about, give, 404
  data/           sermons.json — generated, do not hand-edit
  styles/         site.css (Direction B tokens), global.css (legacy)
public/           favicon, robots.txt, _headers, _redirects
scripts/          pull-sermons.mjs
```

`/design-system` and `/directions/*` are the internal visual references from the
direction-picking phase. They are on the legacy layout, disallowed in
`robots.txt`, and not linked from the public nav.

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
happened. Production is deployment `86d890a4` from `91c27a4` (2026-08-10), verified
byte-identical to the local `dist/` on all five pages, the 404 body and all five staff
portraits.

**Build with `rm -rf dist` first.** The repo sits under iCloud-synced `~/Documents`, and
iCloud writes conflict copies (`visit/index 2.html`, mode 600) into `dist/` at build time.
Astro does not purge unknown files and this deploy uploads the directory wholesale, so a
stale `dist/` ships junk. A clean build is 139 files and `find dist -name "* 2.*"` is empty.

Two things that trip people up here:

- **Deploy with no `CLOUDFLARE_API_TOKEN` set.** `~/.cf-brookside-token` is a scoped
  token with no account-read permission, so wrangler cannot resolve which account to
  deploy into and reports it as an authentication failure. Setting the variable also
  *overrides* the working OAuth session cached in
  `~/Library/Preferences/.wrangler/config/default.toml`. `npx wrangler pages deploy
  --branch main` with no env var works.
- **`--branch main` is the Cloudflare production-environment label, not the git
  branch.** All current work lives on `redesign`; git `main` is still the April
  scaffold. Deploys upload the locally built `dist/`, so the branch names do not have
  to agree, but a fresh clone of `main` is not this site.

Both domains carry Microsoft 365 email, so the DNS cutover is the risky part and
has its own step-by-step: `projects/personal/brookside-church-website/dns-cutover-runbook.md`
in the Compass repo. Read it before changing a nameserver.

### What ships alongside the HTML

- `public/_redirects` — the old Squarespace URLs. Ten real pages and 292 podcast
  episode URLs are indexed today; without this file the cutover turns the
  church's whole search presence into 404s.
- `public/_headers` — security headers and immutable caching for `/_astro/*`.
  What is deliberately *not* set (HSTS, CSP) is documented in the file.

## Verification

From the Compass repo root, against a running dev server:

```bash
PW_CHROME="$HOME/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"

node engine/scripts/audit-brookside-site.mjs http://localhost:4321/visit
node engine/scripts/verify-brookside-deck.mjs      # drives real audio on /watch
```

The audit needs a per-page selector set and refuses to run on a page it does not
know, so add one when adding a page. Chromium proper will not work for either
script: it has no MP3 decoder. Use the branded Chrome for Testing binary.
