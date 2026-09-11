import type { Locale } from './config';

export const calendarUrl = 'https://calendar.app.google/JQnkVUqK3FF5VSRU6';

const whatsappMessages: Record<Locale, { full: string; short: string }> = {
  es: {
    full: 'Hola, llegué desde Next Wrld. Quiero conversar sobre un proceso de mi empresa que estamos buscando mejorar.',
    short: 'Hola, llegué desde Next Wrld.'
  },
  en: {
    full: 'Hello, I came from Next Wrld. I want to talk about a process in my company we are looking to improve.',
    short: 'Hello, I came from Next Wrld.'
  }
};

const emailSubjects: Record<Locale, string> = {
  es: 'Diagnóstico operativo',
  en: 'Operational diagnostic'
};

export function whatsappUrl(locale: Locale, variant: 'full' | 'short' = 'full'): string {
  return `https://wa.me/5491173678601?text=${encodeURIComponent(whatsappMessages[locale][variant])}`;
}

export function mailtoUrl(locale: Locale): string {
  return `mailto:hola@nextwrld.com?subject=${encodeURIComponent(emailSubjects[locale])}`;
}
