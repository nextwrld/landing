import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/guides/internationalization/
export default defineConfig({
  site: 'https://nextwrld.com',
  output: 'static',
  vite: {
    server: {
      allowedHosts: ['3d0d-190-210-36-124.ngrok-free.app']
    }
  },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false
    }
  }
});
