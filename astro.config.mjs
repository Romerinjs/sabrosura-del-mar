import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://lasabrosuradelmar.com',
  integrations: [mdx(), sitemap()],
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});

