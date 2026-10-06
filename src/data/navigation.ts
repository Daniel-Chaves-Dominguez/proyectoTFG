export interface NavItem {
  href: string;
  label: string;
}

/** Enlaces del menú principal. Con «/#…» funcionan también desde las páginas legales. */
export const navigation: NavItem[] = [
  { href: '/#tratamientos', label: 'Tratamientos' },
  { href: '/#zonas', label: 'Zonas y sesiones' },
  { href: '/#laser', label: 'Cómo funciona' },
  { href: '/#preguntas', label: 'Preguntas' },
  { href: '/#contacto', label: 'Contacto' },
];
