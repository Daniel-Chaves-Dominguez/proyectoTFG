/**
 * Zonas de depilación láser agrupadas por área.
 * Sesiones e intervalos son orientativos (valores habituales con láser de diodo);
 * el plan real se fija en la valoración. Revisar con María antes de publicar.
 */

export interface Zone {
  name: string;
  /** Precio por sesión en euros. Si no se indica, la web muestra «Consultar». */
  price?: number;
}

export interface ZoneGroup {
  id: string;
  name: string;
  /** Texto corto para la ficha de la zona. */
  summary: string;
  zones: Zone[];
  /** Rango habitual de sesiones [mín, máx]. */
  sessions: [number, number];
  /** Semanas entre sesiones [mín, máx]. */
  intervalWeeks: [number, number];
}

export const zoneGroups: ZoneGroup[] = [
  {
    id: 'rostro',
    name: 'Rostro',
    summary:
      'El vello facial depende mucho de las hormonas, así que necesita más sesiones y más seguidas que el resto del cuerpo.',
    zones: [
      { name: 'Labio superior' },
      { name: 'Mentón' },
      { name: 'Patillas' },
      { name: 'Entrecejo' },
      { name: 'Mejillas' },
      { name: 'Cuello' },
      { name: 'Rostro completo' },
      { name: 'Barba (perfilado)' },
    ],
    sessions: [8, 12],
    intervalWeeks: [4, 6],
  },
  {
    id: 'axilas-ingles',
    name: 'Axilas e ingles',
    summary:
      'Son las zonas donde antes se notan los resultados: el vello es grueso y oscuro, y absorbe muy bien la luz del láser.',
    zones: [
      { name: 'Axilas' },
      { name: 'Ingles' },
      { name: 'Ingle brasileña' },
      { name: 'Ingle completa' },
      { name: 'Perianal' },
    ],
    sessions: [6, 8],
    intervalWeeks: [6, 8],
  },
  {
    id: 'brazos',
    name: 'Brazos y manos',
    summary:
      'El vello de los brazos suele ser más fino y claro. Según su color y grosor, puede necesitar alguna sesión más.',
    zones: [{ name: 'Brazos completos' }, { name: 'Medios brazos' }, { name: 'Manos y dedos' }],
    sessions: [6, 10],
    intervalWeeks: [6, 8],
  },
  {
    id: 'piernas',
    name: 'Piernas y glúteos',
    summary:
      'Zonas amplias en las que el vello crece despacio, por eso las sesiones se separan más entre sí.',
    zones: [
      { name: 'Piernas completas' },
      { name: 'Medias piernas' },
      { name: 'Muslos' },
      { name: 'Glúteos' },
      { name: 'Pies' },
    ],
    sessions: [6, 10],
    intervalWeeks: [8, 10],
  },
  {
    id: 'torso',
    name: 'Pecho y espalda',
    summary:
      'Muy habituales también en hombres. Se tratan con sesiones espaciadas porque el vello de estas zonas crece despacio.',
    zones: [
      { name: 'Pecho' },
      { name: 'Abdomen' },
      { name: 'Línea alba' },
      { name: 'Espalda' },
      { name: 'Hombros' },
      { name: 'Lumbares' },
    ],
    sessions: [6, 10],
    intervalWeeks: [8, 10],
  },
];

const WEEKS_PER_MONTH = 52 / 12;

/** Duración aproximada del tratamiento completo, en meses [mín, máx]. */
export function treatmentMonths({ sessions, intervalWeeks }: ZoneGroup): [number, number] {
  const min = Math.round(((sessions[0] - 1) * intervalWeeks[0]) / WEEKS_PER_MONTH);
  const max = Math.round(((sessions[1] - 1) * intervalWeeks[1]) / WEEKS_PER_MONTH);
  return [min, max];
}

/** Frase para el mensaje de WhatsApp: «depilación láser de axilas e ingles». */
export function treatmentPhrase(group: ZoneGroup): string {
  return `depilación láser de ${group.name.toLowerCase()}`;
}
