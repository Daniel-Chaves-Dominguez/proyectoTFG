import { describe, expect, it } from 'vitest';

import { bookingMessage, whatsappUrl } from './whatsapp';

describe('whatsappUrl', () => {
  it('limpia el número y codifica el texto', () => {
    expect(whatsappUrl('+34 689 751 693', 'Hola, ¿tenéis cita?')).toBe(
      'https://wa.me/34689751693?text=Hola%2C%20%C2%BFten%C3%A9is%20cita%3F',
    );
  });

  it('sin texto no añade parámetros', () => {
    expect(whatsappUrl('34689751693')).toBe('https://wa.me/34689751693');
    expect(whatsappUrl('34689751693', '   ')).toBe('https://wa.me/34689751693');
  });
});

describe('bookingMessage', () => {
  it('compone un mensaje completo', () => {
    expect(
      bookingMessage({
        name: ' Lucía ',
        treatment: 'depilación láser de axilas e ingles',
        preference: 'tardes',
        notes: 'Es mi primera vez.',
      }),
    ).toBe(
      [
        'Hola, soy Lucía.',
        'Me gustaría pedir cita para depilación láser de axilas e ingles.',
        'Me viene mejor por las tardes.',
        'Es mi primera vez.',
      ].join('\n'),
    );
  });

  it('pide asesoramiento si no hay tratamiento y omite la franja indiferente', () => {
    expect(bookingMessage({ name: 'Ana', treatment: '', preference: 'indiferente' })).toBe(
      'Hola, soy Ana.\nMe gustaría que me asesorarais sobre qué tratamiento me conviene.',
    );
  });
});
