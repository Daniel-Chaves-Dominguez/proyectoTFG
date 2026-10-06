/**
 * Datos del negocio: única fuente de verdad para la web, el SEO y las páginas legales.
 * Si cambia el teléfono, el horario o la dirección, se cambia aquí y nada más.
 *
 * Los campos vacíos ('') se marcan como pendientes al compilar (ver integrations/).
 */
import type { WeeklySchedule } from '../lib/hours';

export interface Business {
  name: string;
  tagline: string;
  /** Teléfono tal como se muestra y en formato internacional para enlaces tel: y WhatsApp. */
  phone: { display: string; international: string };
  /** Número para wa.me: prefijo de país + número, sin «+» ni espacios. */
  whatsapp: string;
  instagram: { handle: string; url: string };
  address: {
    /** Tal como aparece en el flyer. */
    display: string;
    /** Forma completa para Google y datos estructurados. */
    street: string;
    postalCode: string;
    locality: string;
    region: string;
    country: 'ES';
  };
  timeZone: string;
  hours: WeeklySchedule;
  /** Datos legales (LSSI-CE y RGPD). Rellenar antes de publicar. */
  legal: {
    holder: string;
    taxId: string;
    email: string;
  };
  /** Crédito opcional en el pie. Pon `null` para quitarlo. */
  credit: { text: string; url?: string } | null;
}

export const business: Business = {
  name: 'María Chaves',
  tagline: 'Depilación láser y estética',
  phone: { display: '689 751 693', international: '+34689751693' },
  whatsapp: '34689751693',
  instagram: {
    handle: 'maria.chaves.depra',
    url: 'https://www.instagram.com/maria.chaves.depra/',
  },
  address: {
    display: 'C/ La Palma, 29',
    street: 'Calle La Palma, 29',
    postalCode: '', // PENDIENTE
    locality: '', // PENDIENTE: municipio
    region: '', // PENDIENTE: provincia
    country: 'ES',
  },
  timeZone: 'Europe/Madrid',
  // 0 = domingo … 6 = sábado (misma convención que Date#getDay)
  hours: {
    0: [],
    1: [
      { open: '10:00', close: '13:30' },
      { open: '17:00', close: '20:30' },
    ],
    2: [
      { open: '10:00', close: '13:30' },
      { open: '17:00', close: '20:30' },
    ],
    3: [
      { open: '10:00', close: '13:30' },
      { open: '17:00', close: '20:30' },
    ],
    4: [
      { open: '10:00', close: '13:30' },
      { open: '17:00', close: '20:30' },
    ],
    5: [
      { open: '10:00', close: '13:30' },
      { open: '17:00', close: '20:30' },
    ],
    6: [{ open: '10:00', close: '12:30' }],
  },
  legal: {
    holder: 'María Chaves', // PENDIENTE: nombre y apellidos completos del titular
    taxId: '', // PENDIENTE: NIF
    email: '', // PENDIENTE: correo de contacto
  },
  credit: {
    text: 'Diseño y desarrollo web: Brandon Chusgo',
    url: 'https://github.com/brandon03-cell',
  },
};

/** Teléfono con espacios de no separación: el número nunca se parte entre dos líneas. */
export const phoneLabel = business.phone.display.replace(/ /g, '\u00a0');

/** Dirección en una línea, solo con los datos disponibles. */
export function fullAddress(b: Business = business): string {
  const { street, postalCode, locality, region } = b.address;
  const town = [postalCode, locality].filter(Boolean).join(' ');
  return [street, town, region].filter(Boolean).join(', ');
}

/** Enlace a Google Maps para «Cómo llegar». */
export function mapsUrl(b: Business = business): string {
  const query = [b.name, fullAddress(b)].join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Lista legible de datos que faltan por completar. */
export function missingBusinessData(b: Business = business): string[] {
  const missing: string[] = [];
  if (!b.address.locality) missing.push('address.locality (municipio)');
  if (!b.address.postalCode) missing.push('address.postalCode (código postal)');
  if (!b.address.region) missing.push('address.region (provincia)');
  if (!b.legal.taxId) missing.push('legal.taxId (NIF del titular)');
  if (!b.legal.email) missing.push('legal.email (correo de contacto)');
  return missing;
}
