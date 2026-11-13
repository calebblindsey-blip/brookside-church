// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
    site: 'https://brooksidechurchofgod.com',
    integrations: [mdx(), sitemap()],

    vite: {
		plugins: [tailwindcss()],
	},

    adapter: cloudflare()
});