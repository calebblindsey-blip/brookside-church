# Brookside Church of God — Website

Redesign + migration of [brooksidechurchofgod.com](https://brooksidechurchofgod.com)
off Squarespace onto Cloudflare Pages.

**Stack:** Astro 5 · TypeScript · Tailwind v4 · Fraunces + Inter + JetBrains Mono
**Hosting:** Cloudflare Pages (free)
**Podcast host (post-migration):** Spotify for Creators

Design doc and project tracker live in the Compass repo:
`projects/brookside-church-website/`.

## Local dev

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static build to dist/
npm run preview   # serve the built site locally
```

## Structure

```
src/
  components/     Header, Footer, GhostWatermark
  layouts/        BaseLayout
  pages/          index.astro, design-system.astro
  styles/         global.css (Tailwind theme + tokens)
public/           favicon, robots.txt, future images/fonts
```

The `/design-system` route is the internal visual reference. It's disallowed
in `robots.txt` and not linked in the public nav.

## Deploy

Push to `main` → Cloudflare Pages auto-builds and deploys.
Build command: `npm run build` · Output directory: `dist`.
