import type { AstroIntegration } from 'astro';

import { missingBusinessData } from '../src/data/business';

/**
 * Avisa (sin romper la build) de los datos del negocio que faltan por completar
 * y de si la URL pública del sitio no está configurada.
 */
export function businessDataCheck(): AstroIntegration {
  return {
    name: 'business-data-check',
    hooks: {
      'astro:config:done': ({ logger }) => {
        const missing = missingBusinessData();
        if (missing.length > 0) {
          logger.warn(
            `Faltan datos en src/data/business.ts:\n${missing.map((m) => `  - ${m}`).join('\n')}`,
          );
        }
      },
      'astro:build:start': ({ logger }) => {
        if (
          !process.env.SITE_URL &&
          !process.env.VERCEL_PROJECT_PRODUCTION_URL &&
          !process.env.URL
        ) {
          logger.warn(
            'SITE_URL no está definida: las URL canónicas y el sitemap apuntarán a localhost. ' +
              'Define SITE_URL=https://tudominio.es al compilar (en Vercel y Netlify se detecta sola).',
          );
        }
      },
    },
  };
}
