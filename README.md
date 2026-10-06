# María Chaves, depilación láser y estética

Web corporativa del centro, hecha con **Astro 7**, **Tailwind CSS 4** y **TypeScript**.
Es un sitio estático: no necesita servidor ni base de datos y se puede alojar gratis.

## Puesta en marcha

Requisitos: **Node.js 22.12 o superior**.

```bash
npm install
npm run dev       # http://localhost:4321
```

| Comando           | Qué hace                                                   |
| ----------------- | ---------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga automática              |
| `npm run build`   | Comprueba tipos (`astro check`) y genera la web en `dist/` |
| `npm run preview` | Sirve `dist/` para revisarla antes de publicar             |
| `npm test`        | Tests de la lógica (horario y mensajes de WhatsApp)        |
| `npm run format`  | Formatea el código con Prettier                            |

Al abrir la carpeta en VS Code se sugieren las extensiones **Astro**, **Tailwind CSS IntelliSense**
y **Prettier**. No hace falta ningún plugin de pago.

## Antes de publicar

Todos los datos del negocio están en **`src/data/business.ts`**. Al compilar, la web avisa en la
terminal de lo que falta.

- [ ] **Municipio, código postal y provincia**: mejoran el SEO local, el enlace «Cómo llegar» y
      los datos que lee Google.
- [ ] **NIF y correo del titular**: los exigen el aviso legal y la política de privacidad. Mientras
      falten, esas páginas muestran un aviso amarillo.
- [ ] **Tratamientos de estética** (`src/data/services.ts`): la lista es una propuesta; confírmala
      con María.
- [ ] **Sesiones e intervalos** (`src/data/zones.ts`) y **preguntas frecuentes**
      (`src/data/faq.ts`): son valores orientativos habituales; revísalos con ella.
- [ ] **Precios** (opcional): añade `price` a una zona en `src/data/zones.ts` y la web muestra
      «desde X €».
- [ ] **Textos legales**: son una plantilla razonable, pero conviene que los revise un profesional.
- [ ] **Crédito del pie**: está en `business.credit`; pon `null` para quitarlo.

## Estructura

```
src/
  assets/brand/       Logo vectorizado: logo.svg (completo), mc.svg (monograma), rama.svg
  components/         Secciones de la página (Hero, Treatments, ZonePlanner, Booking…)
  components/brand/   Emblema animado y destello
  data/               Contenido editable: negocio, zonas, servicios, preguntas, menú
  layouts/            Plantilla base (SEO, fuentes, cabecera, pie) y plantilla legal
  lib/                Lógica: horario en tiempo real, WhatsApp, schema.org (+ tests)
  pages/              Inicio, aviso legal, privacidad, 404 y robots.txt
  styles/global.css   Tokens de marca (colores, tipografía, espaciado) y componentes
integrations/         Aviso de datos pendientes al compilar
public/               Favicon, iconos, imagen para redes (og.jpg) y manifest
```

## Qué incluye

- **Cita por WhatsApp sin backend**: el formulario compone el mensaje y abre `wa.me` con todo
  escrito. No se guarda ningún dato. Cada zona tiene además su propio botón de cita.
- **Horario en tiempo real**: «Abierto ahora, hasta las 13:30» o «Abrimos hoy a las 17:00»,
  calculado con la hora de Madrid aunque el visitante esté en otra zona horaria.
- **Selector de zonas** con sesiones, intervalo y duración aproximada. Funciona sin JavaScript
  (radios nativos + `:has()`).
- **Diagrama de cómo actúa el láser** con las tres fases del vello y un botón para simular el
  disparo.
- **Emblema animado** en CSS puro: un punto de luz dibuja el anillo del logo. Respeta «reducir
  movimiento».
- **SEO**: títulos y descripciones, Open Graph, datos estructurados `BeautySalon` con horario,
  sitemap y robots.txt.
- **RGPD**: sin cookies, sin analítica y con las fuentes servidas desde la propia web, así que
  no hace falta banner de cookies. Si algún día se añade Google Analytics, sí hará falta.
- **Accesibilidad**: contraste AA, foco visible, navegación por teclado, enlace «Saltar al
  contenido» y landmarks.

## Calidad comprobada

- `astro check`: 0 errores, 0 avisos
- Vitest: 14 tests en verde
- html-validate: sin errores en las 4 páginas
- axe-core (WCAG 2.2 AA): 0 incidencias en móvil y escritorio
- Lighthouse (móvil y escritorio): 100 en rendimiento, accesibilidad, buenas prácticas y SEO
- Revisada en 390, 768 y 1440 px sin desbordamiento horizontal

## Publicar

**Vercel** (recomendado): importa el repositorio y Vercel detecta Astro solo. Las URL canónicas y
el sitemap usan el dominio de producción automáticamente. `vercel.json` añade cabeceras de
seguridad y caché.

**Netlify**: comando `npm run build`, carpeta `dist`.

**Dominio propio**: define la variable de entorno `SITE_URL=https://www.tudominio.es`
(ver `.env.example`).

## El logo

`src/assets/brand/logo.svg` es el logo vectorizado a partir del JPG original, con los degradados
de oro rosa. Sirve también para imprenta, cartelería o redes, y se escala sin perder calidad.
