/**
 * Tratamientos de estética que se ofrecen junto a la depilación láser.
 * PENDIENTE: confirmar con María la lista real y ajustar textos.
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  /** Frase para el mensaje de WhatsApp. */
  phrase: string;
}

export const aestheticServices: Service[] = [
  {
    id: 'facial',
    name: 'Estética facial',
    description: 'Limpieza facial profunda e hidratación adaptadas a tu tipo de piel.',
    phrase: 'un tratamiento de estética facial',
  },
  {
    id: 'cejas-pestanas',
    name: 'Cejas y pestañas',
    description:
      'Diseño de cejas, lifting y tinte de pestañas para una mirada definida sin maquillaje.',
    phrase: 'cejas y pestañas',
  },
  {
    id: 'manos-pies',
    name: 'Manos y pies',
    description: 'Manicura y pedicura, también con esmaltado semipermanente.',
    phrase: 'manicura o pedicura',
  },
];
