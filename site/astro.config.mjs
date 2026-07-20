import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/* ============================================================================
 * SITE alimenta canonical, sitemap e og:url.
 *
 * O site roda no GitHub Pages sob o dominio proprio movvin.com.br (apex), via
 * arquivo public/CNAME. Como o dominio serve a partir da raiz, NAO ha `base`:
 * todo caminho absoluto (/img, /fonts, /video) resolve direto contra a raiz.
 *
 * Se um dia voltar a servir em subcaminho (ex.: nattanlima.github.io/lp-movvin),
 * reintroduza `base: '/lp-movvin'` e ajuste o `site` de volta.
 * ========================================================================== */
export default defineConfig({
  site: 'https://movvin.com.br',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
