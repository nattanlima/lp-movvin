import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/* ============================================================================
 * SITE e BASE alimentam canonical, sitemap e og:url.
 *
 * Hoje o site mora no GitHub Pages, que serve projeto em /<repo>/. Por isso o
 * `base`: sem ele, todo caminho absoluto (/img, /fonts, /video) apontaria pra
 * raiz do dominio e daria 404.
 *
 * QUANDO O DOMINIO PROPRIO EXISTIR (movvin.com.br):
 *   site: 'https://www.movvin.com.br'
 *   base: '/'        <- ou apague a linha
 * e configure o dominio custom no Pages. Sao as duas unicas linhas que mudam.
 * ========================================================================== */
export default defineConfig({
  site: 'https://nattanlima.github.io',
  base: '/lp-movvin',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
