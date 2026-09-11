import type { Locale } from './config';

export type InsightKey =
  | 'cuando-excel-deja-de-ser-suficiente'
  | 'software-a-medida-cuando-tiene-sentido'
  | 'automatizar-integrar-o-construir'
  | 'procesos-que-conviene-automatizar'
  | 'centralizar-informacion-dispersa'
  | 'comprar-software-o-construirlo'
  | 'senales-proceso-manual-limite'
  | 'que-hace-un-sistema-de-gestion'
  | 'detectar-tareas-automatizar'
  | 'integrar-herramientas-antes-de-reemplazar'
  | 'primera-version-sistema-interno'
  | 'mas-funcionalidades-no-mejoran-producto'
  | 'modernizar-sistema-vs-reemplazar'
  | 'ia-dentro-de-un-proceso'
  | 'que-preparar-antes-de-hablar-software'
  | 'de-sistema-a-problema-definido';

const slugs: Record<InsightKey, Record<Locale, string>> = {
  'cuando-excel-deja-de-ser-suficiente': {
    es: 'cuando-excel-deja-de-ser-suficiente',
    en: 'when-excel-is-no-longer-enough'
  },
  'software-a-medida-cuando-tiene-sentido': {
    es: 'software-a-medida-cuando-tiene-sentido',
    en: 'custom-software-when-it-makes-sense'
  },
  'automatizar-integrar-o-construir': {
    es: 'automatizar-integrar-o-construir',
    en: 'automate-integrate-or-build'
  },
  'procesos-que-conviene-automatizar': {
    es: 'procesos-que-conviene-automatizar',
    en: 'which-processes-to-automate-first'
  },
  'centralizar-informacion-dispersa': {
    es: 'centralizar-informacion-dispersa',
    en: 'centralizing-scattered-information'
  },
  'comprar-software-o-construirlo': {
    es: 'comprar-software-o-construirlo',
    en: 'buy-software-or-build-it'
  },
  'senales-proceso-manual-limite': {
    es: 'senales-proceso-manual-limite',
    en: 'signs-manual-process-reaching-limit'
  },
  'que-hace-un-sistema-de-gestion': {
    es: 'que-hace-un-sistema-de-gestion',
    en: 'what-management-system-does'
  },
  'detectar-tareas-automatizar': {
    es: 'detectar-tareas-automatizar',
    en: 'spotting-tasks-to-automate'
  },
  'integrar-herramientas-antes-de-reemplazar': {
    es: 'integrar-herramientas-antes-de-reemplazar',
    en: 'integrate-tools-before-replacing'
  },
  'primera-version-sistema-interno': {
    es: 'primera-version-sistema-interno',
    en: 'first-version-internal-system'
  },
  'mas-funcionalidades-no-mejoran-producto': {
    es: 'mas-funcionalidades-no-mejoran-producto',
    en: 'more-features-dont-improve-product'
  },
  'modernizar-sistema-vs-reemplazar': {
    es: 'modernizar-sistema-vs-reemplazar',
    en: 'modernize-system-vs-replace'
  },
  'ia-dentro-de-un-proceso': {
    es: 'ia-dentro-de-un-proceso',
    en: 'ai-inside-a-process'
  },
  'que-preparar-antes-de-hablar-software': {
    es: 'que-preparar-antes-de-hablar-software',
    en: 'what-to-prepare-before-talking-software'
  },
  'de-sistema-a-problema-definido': {
    es: 'de-sistema-a-problema-definido',
    en: 'from-system-request-to-defined-problem'
  }
};

export const insightKeys: InsightKey[] = Object.keys(slugs) as InsightKey[];

export function insightPath(key: InsightKey, locale: Locale): string {
  return locale === 'es' ? `/insights/${slugs[key].es}/` : `/en/insights/${slugs[key].en}/`;
}

export function alternateInsightPaths(key: InsightKey): Record<Locale, string> {
  return {
    es: insightPath(key, 'es'),
    en: insightPath(key, 'en')
  };
}

export function insightSlug(key: InsightKey, locale: Locale): string {
  return slugs[key][locale];
}
