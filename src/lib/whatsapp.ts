/**
 * Enlaces de WhatsApp con mensaje preparado.
 * wa.me abre la app en el móvil y WhatsApp Web/escritorio en el ordenador.
 */

export function whatsappUrl(phone: string, text?: string): string {
  const number = phone.replace(/\D/g, '');
  const base = `https://wa.me/${number}`;
  const message = text?.trim();
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const TIME_PREFERENCES = {
  mananas: 'por las mañanas',
  tardes: 'por las tardes',
  sabado: 'el sábado por la mañana',
  indiferente: '',
} as const;

export type TimePreference = keyof typeof TIME_PREFERENCES;

export interface BookingRequest {
  name: string;
  /** Frase del tratamiento («depilación láser de axilas e ingles») o vacío si pide asesoramiento. */
  treatment: string;
  preference: TimePreference;
  notes?: string;
}

/** Mensaje de reserva tal como lo recibirá el centro. */
export function bookingMessage({ name, treatment, preference, notes }: BookingRequest): string {
  const lines = [`Hola, soy ${name.trim()}.`];

  lines.push(
    treatment.trim()
      ? `Me gustaría pedir cita para ${treatment.trim()}.`
      : 'Me gustaría que me asesorarais sobre qué tratamiento me conviene.',
  );

  const when = TIME_PREFERENCES[preference];
  if (when) lines.push(`Me viene mejor ${when}.`);

  const extra = notes?.trim();
  if (extra) lines.push(extra);

  return lines.join('\n');
}
