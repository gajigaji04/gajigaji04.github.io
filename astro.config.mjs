// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import legacyRedirects from './integrations/legacy-redirects.mjs';
import { LEGACY_REDIRECTS } from './src/data/redirects.mjs';

export default defineConfig({
  site: 'https://gajigaji04.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [mdx(), legacyRedirects(LEGACY_REDIRECTS)],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: false,
    },
  },
});
