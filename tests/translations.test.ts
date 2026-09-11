import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, type Dirent } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { insightKeys, insightPath } from '../src/i18n/insights.ts';
import { whatsappUrl, mailtoUrl, calendarUrl } from '../src/i18n/contact.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const esMainPages = [
  'src/pages/index.astro',
  'src/pages/servicios/index.astro',
  'src/pages/como-trabajamos/index.astro',
  'src/pages/casos/index.astro',
  'src/pages/insights/index.astro',
  'src/pages/nosotros/index.astro',
];

const spanishMarkers = [
  'Volver a Insights',
  'min de lectura',
  'Analizar mi operación',
  'Analizar mi caso',
  'Agendar diagnóstico',
  'Hablar por WhatsApp',
  'Hola%2C%20llegu',
  'Diagn%C3%B3stico%20operativo',
];

function odIds(content: string): string[] {
  return [...content.matchAll(/data-od-id="([^"]+)"/g)].map((m) => m[1]).sort();
}

describe('i18n page parity', () => {
  const enInsightFile = (key: (typeof insightKeys)[number]) =>
    join(root, 'src/pages', insightPath(key, 'en').replace(/^\//, '').replace(/\/$/, '') + '.astro');

  it('covers all 16 insight keys with ES and EN astro pages', () => {
    assert.equal(insightKeys.length, 16);
    for (const key of insightKeys) {
      const es = join(root, `src/pages/insights/${key}.astro`);
      const en = enInsightFile(key);
      assert.ok(existsSync(es), `missing ES insight page for ${key}`);
      assert.ok(existsSync(en), `missing EN insight page for ${key}: ${en}`);
    }
  });

  it('EN insight pages declare locale, routeKey, canonical and mirrored alternates', () => {
    for (const key of insightKeys) {
      const enFile = enInsightFile(key);
      const content = readFileSync(enFile, 'utf8');
      assert.ok(content.includes('locale="en"'), `${enFile} must set locale="en"`);
      assert.ok(content.includes('routeKey="insights"'), `${enFile} must set routeKey="insights"`);
      assert.ok(
        content.includes(`canonicalPath="${insightPath(key, 'en')}"`),
        `${enFile} must set canonicalPath="${insightPath(key, 'en')}"`,
      );
      assert.ok(content.includes(`es: '${insightPath(key, 'es')}'`), `${enFile} must declare ES alternate`);
      assert.ok(content.includes(`en: '${insightPath(key, 'en')}'`), `${enFile} must declare EN alternate`);
      assert.ok(content.includes('href="/en/insights/"'), `${enFile} must link back to /en/insights/`);
    }
  });

  it('EN pages contain no hardcoded Spanish UI markers', () => {
    // check all EN astro files under src/pages/en
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((e: Dirent) =>
        e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.astro') ? [join(dir, e.name)] : [],
      );
    for (const file of walk(join(root, 'src/pages/en'))) {
      const content = readFileSync(file, 'utf8');
      for (const marker of spanishMarkers) {
        assert.ok(!content.includes(marker), `${file} must not contain Spanish marker: ${marker}`);
      }
      assert.ok(!content.includes('locale="es"'), `${file} must not set locale="es"`);
    }
  });

  it('EN main pages mirror ES section structure (data-od-id)', () => {
    const pairs = [
      ['src/pages/index.astro', 'src/pages/en/index.astro'],
      ['src/pages/servicios/index.astro', 'src/pages/en/services/index.astro'],
      ['src/pages/como-trabajamos/index.astro', 'src/pages/en/how-we-work/index.astro'],
      ['src/pages/casos/index.astro', 'src/pages/en/case-studies/index.astro'],
      ['src/pages/nosotros/index.astro', 'src/pages/en/about/index.astro'],
    ];
    for (const [es, en] of pairs) {
      const esIds = odIds(readFileSync(join(root, es), 'utf8'));
      const enIds = odIds(readFileSync(join(root, en), 'utf8'));
      for (const id of esIds) {
        assert.ok(enIds.includes(id), `${en} is missing section data-od-id="${id}" from ${es}`);
      }
    }
  });

  it('shared contact components are localized (no hardcoded Spanish message)', () => {
    for (const file of [
      'src/components/shared/WhatsAppButton.astro',
      'src/components/shared/FinalCTA.astro',
      'src/components/layout/Footer.astro',
    ]) {
      const content = readFileSync(join(root, file), 'utf8');
      assert.ok(!content.includes('Hola%2C'), `${file} must not hardcode the Spanish WhatsApp message`);
    }
    assert.ok(whatsappUrl('es').includes(encodeURIComponent('Hola').slice(0, 4)));
    assert.ok(whatsappUrl('en').includes('Hello'));
    assert.ok(mailtoUrl('es').includes('Diagn'));
    assert.ok(mailtoUrl('en').includes('Operational'));
    assert.ok(calendarUrl.includes('calendar.app.google'));
  });

  it('ES main pages still exist untouched', () => {
    for (const file of esMainPages) {
      assert.ok(existsSync(join(root, file)), `missing ES page ${file}`);
    }
  });
});
