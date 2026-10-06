/**
 * Horario de apertura: agrupación para mostrarlo y estado «abierto/cerrado» en tiempo real.
 * Funciones puras y sin dependencias para poder testearlas y usarlas en el navegador.
 */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo
export interface TimeRange {
  /** Formato 24 h «HH:MM». */
  open: string;
  close: string;
}
export type WeeklySchedule = Record<Weekday, TimeRange[]>;

export const WEEKDAY_NAMES = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
] as const;

/** Orden de la semana en España: de lunes a domingo. */
const WEEK_ORDER: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

export function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  if (h === undefined || m === undefined || Number.isNaN(h) || Number.isNaN(m)) {
    throw new Error(`Hora no válida: «${time}» (usa HH:MM)`);
  }
  return h * 60 + m;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export interface ScheduleGroup {
  /** «Lunes a viernes», «Sábado», «Domingo». */
  label: string;
  days: Weekday[];
  ranges: TimeRange[];
}

/** Agrupa días consecutivos con el mismo horario (p. ej. «Lunes a viernes»). */
export function groupSchedule(schedule: WeeklySchedule): ScheduleGroup[] {
  const groups: ScheduleGroup[] = [];
  const key = (ranges: TimeRange[]) => ranges.map((r) => `${r.open}-${r.close}`).join('|');

  for (const day of WEEK_ORDER) {
    const ranges = schedule[day];
    const last = groups.at(-1);
    if (last && key(last.ranges) === key(ranges)) {
      last.days.push(day);
    } else {
      groups.push({ label: '', days: [day], ranges });
    }
  }

  for (const group of groups) {
    const first = WEEKDAY_NAMES[group.days[0]!];
    const lastDay = WEEKDAY_NAMES[group.days.at(-1)!];
    group.label =
      group.days.length === 1
        ? capitalize(first)
        : group.days.length === 2
          ? `${capitalize(first)} y ${lastDay}`
          : `${capitalize(first)} a ${lastDay}`;
  }
  return groups;
}

/** «10:00 a 13:30 y 17:00 a 20:30» */
export function formatRanges(ranges: TimeRange[]): string {
  if (ranges.length === 0) return 'Cerrado';
  return ranges.map((r) => `${r.open} a ${r.close}`).join(' y ');
}

/** Día de la semana y minutos desde medianoche en la zona horaria del negocio. */
export function zonedNow(date: Date, timeZone: string): { weekday: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekday = weekdays.indexOf(get('weekday')) as Weekday;
  const minutes = Number(get('hour')) * 60 + Number(get('minute'));
  return { weekday, minutes };
}

export type OpeningStatus =
  | { open: true; closesAt: string }
  | { open: false; next: { daysFromToday: number; weekday: Weekday; opensAt: string } | null };

export function getOpeningStatus(
  schedule: WeeklySchedule,
  date: Date,
  timeZone: string,
): OpeningStatus {
  const { weekday, minutes } = zonedNow(date, timeZone);

  for (const range of schedule[weekday]) {
    if (minutes >= toMinutes(range.open) && minutes < toMinutes(range.close)) {
      return { open: true, closesAt: range.close };
    }
  }

  for (let offset = 0; offset <= 7; offset++) {
    const day = ((weekday + offset) % 7) as Weekday;
    const upcoming = schedule[day].find((r) => offset > 0 || toMinutes(r.open) > minutes);
    if (upcoming) {
      return { open: false, next: { daysFromToday: offset, weekday: day, opensAt: upcoming.open } };
    }
  }
  return { open: false, next: null };
}

/** Frase para mostrar al público. */
export function describeStatus(status: OpeningStatus): string {
  if (status.open) return `Abierto ahora, hasta las ${status.closesAt}.`;
  if (!status.next) return 'Cerrado temporalmente.';
  const { daysFromToday, weekday, opensAt } = status.next;
  const when =
    daysFromToday === 0 ? 'hoy' : daysFromToday === 1 ? 'mañana' : `el ${WEEKDAY_NAMES[weekday]}`;
  return `Cerrado ahora. Abrimos ${when} a las ${opensAt}.`;
}
