import type { Locale } from './config';
import { route, type RouteKey } from './routes';

export interface NavItem {
  key: RouteKey;
  label: string;
}

const navigation: Record<Locale, NavItem[]> = {
  es: [
    { key: 'services', label: 'Servicios' },
    { key: 'howWeWork', label: 'Cómo trabajamos' },
    { key: 'cases', label: 'Casos' },
    { key: 'insights', label: 'Insights' },
    { key: 'about', label: 'Nosotros' }
  ],
  en: [
    { key: 'services', label: 'Services' },
    { key: 'howWeWork', label: 'How we work' },
    { key: 'cases', label: 'Case studies' },
    { key: 'insights', label: 'Insights' },
    { key: 'about', label: 'About' }
  ]
};

const chrome = {
  es: {
    diagnosticCta: 'Diagnóstico operativo',
    scheduleDiagnostic: 'Agendar diagnóstico',
    openMenu: 'Abrir menú',
    whatsappLabel: 'Hablar por WhatsApp'
  },
  en: {
    diagnosticCta: 'Operational diagnostic',
    scheduleDiagnostic: 'Book a diagnostic',
    openMenu: 'Open menu',
    whatsappLabel: 'Chat on WhatsApp'
  }
} as const;

export function getNav(locale: Locale): Array<NavItem & { href: string }> {
  return navigation[locale].map((item) => ({
    ...item,
    href: route(item.key, locale)
  }));
}

export function getChrome(locale: Locale) {
  return chrome[locale];
}
