import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const pages = [
  { file: 'src/pages/en/index.astro', routeKey: 'home', canonicalPath: '/en/' },
  { file: 'src/pages/en/services/index.astro', routeKey: 'services', canonicalPath: '/en/services/' },
  { file: 'src/pages/en/how-we-work/index.astro', routeKey: 'howWeWork', canonicalPath: '/en/how-we-work/' },
  { file: 'src/pages/en/case-studies/index.astro', routeKey: 'cases', canonicalPath: '/en/case-studies/' },
  { file: 'src/pages/en/insights/index.astro', routeKey: 'insights', canonicalPath: '/en/insights/' },
  { file: 'src/pages/en/about/index.astro', routeKey: 'about', canonicalPath: '/en/about/' },
];

function attr(content, name) {
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
});
