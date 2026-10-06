import { describe, expect, it } from 'vitest';

import { business } from '../data/business';
import { describeStatus, formatRanges, getOpeningStatus, groupSchedule, zonedNow } from './hours';

const TZ = 'Europe/Madrid';
const status = (iso: string) => describeStatus(getOpeningStatus(business.hours, new Date(iso), TZ));

describe('groupSchedule', () => {
  it('agrupa los días laborables con el mismo horario', () => {
    const groups = groupSchedule(business.hours);
    expect(groups.map((g) => g.label)).toEqual(['Lunes a viernes', 'Sábado', 'Domingo']);
    expect(formatRanges(groups[0]!.ranges)).toBe('10:00 a 13:30 y 17:00 a 20:30');
    expect(formatRanges(groups[2]!.ranges)).toBe('Cerrado');
  });
});

describe('zonedNow', () => {
  it('usa la hora de Madrid aunque el visitante esté en otra zona', () => {
    // 2026-10-05 10:00 UTC = lunes 12:00 en Madrid (horario de verano, UTC+2)
    expect(zonedNow(new Date('2026-10-05T10:00:00Z'), TZ)).toEqual({ weekday: 1, minutes: 720 });
    // 2026-12-07 09:00 UTC = lunes 10:00 en Madrid (horario de invierno, UTC+1)
    expect(zonedNow(new Date('2026-12-07T09:00:00Z'), TZ)).toEqual({ weekday: 1, minutes: 600 });
  });
});

describe('estado abierto / cerrado', () => {
  it('abierto por la mañana', () => {
    expect(status('2026-10-05T10:00:00Z')).toBe('Abierto ahora, hasta las 13:30.');
  });

  it('cerrado a mediodía, abre por la tarde', () => {
    expect(status('2026-10-05T12:00:00Z')).toBe('Cerrado ahora. Abrimos hoy a las 17:00.');
  });

  it('la hora de cierre ya cuenta como cerrado', () => {
    expect(status('2026-10-05T18:30:00Z')).toBe('Cerrado ahora. Abrimos mañana a las 10:00.');
  });

  it('viernes por la noche abre el sábado', () => {
    expect(status('2026-10-09T19:00:00Z')).toBe('Cerrado ahora. Abrimos mañana a las 10:00.');
  });

  it('sábado después de cerrar, abre el lunes', () => {
    expect(status('2026-10-10T11:00:00Z')).toBe('Cerrado ahora. Abrimos el lunes a las 10:00.');
  });

  it('domingo abre mañana lunes', () => {
    expect(status('2026-10-11T07:00:00Z')).toBe('Cerrado ahora. Abrimos mañana a las 10:00.');
  });

  it('sábado justo antes de abrir', () => {
    expect(status('2026-10-10T07:59:00Z')).toBe('Cerrado ahora. Abrimos hoy a las 10:00.');
  });

  it('respeta el cambio a horario de invierno', () => {
    expect(status('2026-12-07T09:00:00Z')).toBe('Abierto ahora, hasta las 13:30.');
  });
});
