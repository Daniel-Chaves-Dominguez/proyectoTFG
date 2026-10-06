/** Preguntas frecuentes. Respuestas generales: revisar con María antes de publicar. */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: '¿Duele?',
    answer:
      'Notarás un calor breve o un pequeño pinchazo con cada disparo. El equipo enfría la piel mientras trabaja y la mayoría de personas lo tolera bien. Las zonas de vello más denso, como ingles o axilas, se notan algo más en las primeras sesiones.',
  },
  {
    question: '¿Cuántas sesiones necesito?',
    answer:
      'Depende de la zona, del color y grosor del vello y de factores hormonales. Como orientación, entre 6 y 10 sesiones en el cuerpo y algunas más en la cara. En la valoración te damos una estimación para tu caso.',
  },
  {
    question: '¿Cada cuánto tiempo son las sesiones?',
    answer:
      'Entre 4 y 10 semanas según la zona. La cara se trata más a menudo y las piernas o la espalda con más separación, porque cada zona tiene su propio ciclo de crecimiento.',
  },
  {
    question: '¿La depilación láser es definitiva?',
    answer:
      'Consigue una reducción del vello muy importante y duradera. Algunas personas necesitan una sesión de repaso de vez en cuando, sobre todo en zonas con influencia hormonal como la cara.',
  },
  {
    question: '¿Funciona con cualquier tipo de piel y de vello?',
    answer:
      'Se adapta a la mayoría de tonos de piel ajustando la potencia y la duración de cada disparo. El vello necesita pigmento para absorber la luz: en vello blanco, canoso o muy rubio el resultado es muy limitado. Lo comprobamos en la valoración.',
  },
  {
    question: '¿Puedo hacerme el láser en verano?',
    answer:
      'Sí, en zonas que no vayan a tomar el sol y usando protector solar. Si vas a broncearte, mejor espera: la piel morena absorbe más luz y aumenta el riesgo de irritación o manchas. Por eso mucha gente empieza en otoño.',
  },
  {
    question: '¿Hay alguna contraindicación?',
    answer:
      'No se aplica durante el embarazo, sobre tatuajes o lunares, ni sobre piel con heridas o quemaduras solares. Algunos medicamentos aumentan la sensibilidad a la luz; si tomas alguno, cuéntanoslo antes de empezar.',
  },
  {
    question: '¿También tratáis a hombres?',
    answer:
      'Sí. Perfilado de barba y cuello, espalda, pecho, hombros y cualquier otra zona del cuerpo.',
  },
];
