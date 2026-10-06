// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { businessDataCheck } from './integrations/business-data-check.ts';

/**
 * URL pública del sitio: la usan las URL canónicas, el sitemap y Open Graph.
 * Prioridad: SITE_URL (manual) → dominio de producción de Vercel → URL de Netlify → localhost.
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site =
  process.env.SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : undefined) ??
  process.env.URL ??
  'http://localhost:4321';

export default defineConfig({
  site,
  integrations: [sitemap(), businessDataCheck()],

  // Fuentes autoalojadas (sin peticiones a Google → sin problemas de RGPD).
  // Solo el subconjunto latino: cubre todos los caracteres del español (á, ñ, ü, ¿, ¡, €).
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'EB Garamond',
      cssVariable: '--font-garamond',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/eb-garamond/files/eb-garamond-latin-wght-normal.woff2'],
            weight: '400 800',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Jost',
      cssVariable: '--font-jost',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/jost/files/jost-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
  ],

  build: {
    // Una sola página principal: el CSS en línea evita peticiones que bloquean el renderizado.
    inlineStylesheets: 'always',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
