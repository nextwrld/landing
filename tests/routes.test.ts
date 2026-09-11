import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { route, routeKeys, type RouteKey } from '../src/i18n/routes.ts';
import { alternateInsightPaths, insightKeys, insightPath } from '../src/i18n/insights.ts';

// Expected EN/ES paths per route key (must mirror src/i18n/routes.ts).
const expected: Record<RouteKey, { es: string; en: string }> = {
  home: { es: '/', en: '/en/' },
  services: { es: '/servicios/', en: '/en/services/' },
  howWeWork: { es: '/como-trabajamos/', en: '/en/how-we-work/' },
  cases: { es: '/casos/', en: '/en/case-studies/' },
  insights: { es: '/insights/', en: '/en/insights/' },
  about: { es: '/nosotros/', en: '/en/about/' },
};

describe('i18n routes', () => {
  for (const key of routeKeys) {
    const paths = expected[key];
    it(`route("${key}", locale) returns the ES and EN paths`, () => {
      assert.equal(route(key, 'es'), paths.es);
      assert.equal(route(key, 'en'), paths.en);
    });
  }

  it('covers all 12 expected routes (6 keys x 2 locales)', () => {
    assert.equal(routeKeys.length, 6);
    const all = routeKeys.flatMap((key) => [route(key, 'es'), route(key, 'en')]);
    assert.equal(all.length, 12);
    assert.equal(new Set(all).size, 12);
  });

  it('insight paths map all 16 ES slugs to translated EN slugs', () => {
    assert.equal(insightKeys.length, 16);
    const seen = new Set();
    for (const key of insightKeys) {
      const es = insightPath(key, 'es');
      const en = insightPath(key, 'en');
      assert.ok(es.startsWith('/insights/') && es.endsWith('/'), `${key} ES path must live under /insights/`);
      assert.ok(en.startsWith('/en/insights/') && en.endsWith('/'), `${key} EN path must live under /en/insights/`);
      assert.ok(!seen.has(en), `${en} must be unique`);
      seen.add(en);
      assert.deepEqual(alternateInsightPaths(key), { es, en });
    }
    assert.equal(seen.size, 16);
  });
});
