import type { Locale } from './config';

export type RouteKey = 'home' | 'services' | 'howWeWork' | 'cases' | 'insights' | 'about' | 'diagnostic';

const paths: Record<RouteKey, Record<Locale, string>> = {
  home: { es: '/', en: '/en/' },
  services: { es: '/servicios/', en: '/en/services/' },
  howWeWork: { es: '/como-trabajamos/', en: '/en/how-we-work/' },
  cases: { es: '/casos/', en: '/en/case-studies/' },
  insights: { es: '/insights/', en: '/en/insights/' },
  about: { es: '/nosotros/', en: '/en/about/' },
  diagnostic: { es: '/diagnostico/', en: '/en/diagnostic/' }
};

export function route(key: RouteKey, locale: Locale): string {
  return paths[key][locale];
}

export function alternateRoute(key: RouteKey, locale: Locale): string {
  return paths[key][locale];
}

export const routeKeys: RouteKey[] = ['home', 'services', 'howWeWork', 'cases', 'insights', 'about', 'diagnostic'];
