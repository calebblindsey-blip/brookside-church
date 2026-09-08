// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Pages that exist for us, not for the public: the visual reference and the
 * three design directions from the picking phase. robots.txt has disallowed
 * /design-system for a while, but the sitemap was still listing it and all
 * three directions, which is the stronger signal of the two — a sitemap is an
 * invitation to index. A church site with two rejected alternate designs in
 * Google is a worse outcome than any of them being reachable by URL.
 *
 * Filtered rather than deleted, because whether those pages get deleted is a
 * separate decision (they are the last consumers of the legacy layout).
 */
// '/directions' is kept here after the pages were deleted 2026-08-24: harmless
// against a path that no longer builds, and correct again if one is ever restored.
// '/design-system' left the list when the page itself was deleted (2026-09, end of
// the Codex-design port). Tailwind left with it: nothing in site.css uses it, and
// @tailwindcss/vite was the piece that broke under Astro 6's rolldown-vite.
const PRIVATE = ['/directions'];

export default defineConfig({
	site: 'https://brooksidechurchofgod.com',
	integrations: [
		sitemap({
			filter: (page) => !PRIVATE.some((p) => new URL(page).pathname.startsWith(p)),
		}),
	],
});
