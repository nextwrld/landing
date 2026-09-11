import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { insightKeys, insightPath } from '../src/i18n/insights.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const pages = [
  { file: 'src/pages/en/index.astro', routeKey: 'home', canonicalPath: '/en/' },
  { file: 'src/pages/en/services/index.astro', routeKey: 'services', canonicalPath: '/en/services/' },
  { file: 'src/pages/en/how-we-work/index.astro', routeKey: 'howWeWork', canonicalPath: '/en/how-we-work/' },
  { file: 'src/pages/en/case-studies/index.astro', routeKey: 'cases', canonicalPath: '/en/case-studies/' },
  { file: 'src/pages/en/insights/index.astro', routeKey: 'insights', canonicalPath: '/en/insights/' },
  { file: 'src/pages/en/about/index.astro', routeKey: 'about', canonicalPath: '/en/about/' },
];

function attr(content: string, name: string): string {
  const match = content.match(new RegExp(`${name}="([^"]+)"`));
  assert.ok(match, `page must define ${name}`);
  return match[1];
}

describe('EN pages SEO', () => {
  it('hreflang alternates are rendered via BaseLayout', () => {
    const layout = readFileSync(join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
    assert.ok(layout.includes('hreflang'), 'BaseLayout must render hreflang links');
  });

  const titles = new Set();
  const descriptions = new Set();

  for (const page of pages) {
    it(`${page.file}: uses BaseLayout with locale en, routeKey and canonicalPath`, () => {
      const content = readFileSync(join(root, page.file), 'utf8');
      assert.ok(content.includes('BaseLayout'), 'page must use BaseLayout');
      assert.ok(content.includes('locale="en"'), 'page must set locale="en"');
      assert.ok(
        content.includes(`routeKey="${page.routeKey}"`),
        `page must set routeKey="${page.routeKey}"`,
      );
      assert.ok(
        content.includes(`canonicalPath="${page.canonicalPath}"`),
        `page must set canonicalPath="${page.canonicalPath}"`,
      );
      assert.ok(!content.includes('.html'), 'EN pages must not link to legacy *.html files');
      titles.add(attr(content, 'title'));
      descriptions.add(attr(content, 'description'));
    });
  }

  it('titles and descriptions are unique per page', () => {
    assert.equal(titles.size, pages.length, 'titles must be unique');
    assert.equal(descriptions.size, pages.length, 'descriptions must be unique');
  });

  it('insight detail pages declare page-specific bilingual alternates', () => {
    for (const key of insightKeys) {
      const esFile = `src/pages/insights/${key}.astro`;
      const enFile = `src/pages/${insightPath(key, 'en').replace(/^\//, '').replace(/\/$/, '')}.astro`;
      for (const file of [esFile, enFile]) {
        const content = readFileSync(join(root, file), 'utf8');
        assert.ok(content.includes(`es: '${insightPath(key, 'es')}'`), `${file} must declare ES alternate`);
        assert.ok(content.includes(`en: '${insightPath(key, 'en')}'`), `${file} must declare EN alternate`);
      }
      const enContent = readFileSync(join(root, enFile), 'utf8');
      assert.ok(enContent.includes('locale="en"'), `${enFile} must set locale="en"`);
      assert.ok(
        enContent.includes(`canonicalPath="${insightPath(key, 'en')}"`),
        `${enFile} must set canonicalPath="${insightPath(key, 'en')}"`,
      );
    }
  });

  it('case detail pages declare page-specific bilingual alternates', () => {
    const layout = readFileSync(join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
    assert.ok(layout.includes('alternatePaths?.es'));
    assert.ok(layout.includes('alternatePaths?.en'));

    for (const detail of [
      { slug: 'aion-wellness', es: 'src/pages/casos/aion-wellness.astro', en: 'src/pages/en/case-studies/aion-wellness.astro' },
      { slug: 'jfhp', es: 'src/pages/casos/jfhp.astro', en: 'src/pages/en/case-studies/jfhp.astro' },
      { slug: 'inmocrm', es: 'src/pages/casos/inmocrm.astro', en: 'src/pages/en/case-studies/inmocrm.astro' },
    ]) {
      for (const file of [detail.es, detail.en]) {
        const content = readFileSync(join(root, file), 'utf8');
        assert.ok(content.includes(`es: '/casos/${detail.slug}/'`));
        assert.ok(content.includes(`en: '/en/case-studies/${detail.slug}/'`));
      }
    }
  });
});
