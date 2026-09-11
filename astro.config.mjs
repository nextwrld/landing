import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/guides/internationalization/
export default defineConfig({
  site: 'https://nextwrld.com',
  output: 'static',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false
    }
  }
});
