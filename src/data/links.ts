import { whatsappUrl } from '../lib/whatsapp';
import { business, mapsUrl } from './business';

/** Enlaces de contacto reutilizados en toda la web. */
export const links = {
  whatsapp: whatsappUrl(business.whatsapp, 'Hola, me gustaría pedir cita.'),
  phone: `tel:${business.phone.international}`,
  instagram: business.instagram.url,
  maps: mapsUrl(),
} as const;
