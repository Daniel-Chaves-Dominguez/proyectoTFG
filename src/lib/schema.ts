/**
 * Datos estructurados (schema.org) para que Google muestre el negocio con
 * dirección, teléfono y horario. Se generan a partir de src/data/business.ts.
 */
import type { Business } from '../data/business';
import type { Service } from '../data/services';
import { treatmentPhrase, type ZoneGroup } from '../data/zones';
import type { Weekday } from './hours';

const SCHEMA_DAYS: Record<Weekday, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Agrupa los tramos idénticos para no repetir una especificación por día. */
function openingHours(business: Business) {
  const byRange = new Map<string, { opens: string; closes: string; days: string[] }>();
  for (const [day, ranges] of Object.entries(business.hours)) {
    for (const range of ranges) {
      const key = `${range.open}-${range.close}`;
      const entry = byRange.get(key) ?? { opens: range.open, closes: range.close, days: [] };
      entry.days.push(SCHEMA_DAYS[Number(day) as Weekday]);
      byRange.set(key, entry);
    }
  }
  return [...byRange.values()].map(({ opens, closes, days }) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: days,
    opens,
    closes,
  }));
}

export function localBusinessSchema(
  business: Business,
  site: URL,
  zones: ZoneGroup[],
  services: Service[],
): Record<string, unknown> {
  const { street, postalCode, locality, region, country } = business.address;
  const address: Record<string, string> = {
    '@type': 'PostalAddress',
    streetAddress: street,
    addressCountry: country,
  };
  if (postalCode) address.postalCode = postalCode;
  if (locality) address.addressLocality = locality;
  if (region) address.addressRegion = region;

  const offered = [
    ...zones.map((zone) => capitalize(treatmentPhrase(zone))),
    ...services.map((service) => service.name),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': new URL('/#negocio', site).href,
    name: business.name,
    description: `${business.tagline}. Depilación láser para mujeres y hombres con cita previa.`,
    url: new URL('/', site).href,
    image: new URL('/og.jpg', site).href,
    logo: new URL('/icon-512.png', site).href,
    telephone: business.phone.international,
    address,
    openingHoursSpecification: openingHours(business),
    sameAs: [business.instagram.url],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tratamientos',
      itemListElement: offered.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };
}
