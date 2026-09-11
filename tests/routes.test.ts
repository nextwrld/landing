import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { route } from '../src/i18n/routes.ts';

// Expected EN/ES paths per route key (must mirror src/i18n/routes.ts).
const expected = {
  home: { es: '/', en: '/en/' },
  services: { es: '/servicios/', en: '/en/services/' },
  howWeWork: { es: '/como-trabajamos/', en: '/en/how-we-work/' },
  cases: { es: '/casos/', en: '/en/case-studies/' },
  insights: { es: '/insights/', en: '/en/insights/' },
  about: { es: '/nosotros/', en: '/en/about/' },
};

describe('i18n routes', () => {
  for (const [key, paths] of Object.entries(expected)) {
    it(`route("${key}", locale) returns the ES and EN paths`, () => {
      assert.equal(route(key, 'es'), paths.es);
      assert.equal(route(key, 'en'), paths.en);
    });
  }

  it('covers all 12 expected routes (6 keys x 2 locales)', () => {
    const keys = Object.keys(expected);
    assert.equal(keys.length, 6);
    const all = keys.flatMap((key) => [route(key, 'es'), route(key, 'en')]);
    assert.equal(all.length, 12);
    assert.equal(new Set(all).size, 12);
  });
});
