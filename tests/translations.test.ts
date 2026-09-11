import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const collections = ['cases', 'insights'];

function parseFrontmatter(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, `${filePath} must start with a frontmatter block`);
  const data = {};
  for (const line of match[1].split('\n')) {
    const sep = line.indexOf(':');
    if (sep === -1) continue;
    data[line.slice(0, sep).trim()] = line.slice(sep + 1).trim();
  }
  return data;
}

function entriesFor(collection) {
  const out = [];
  for (const locale of ['es', 'en']) {
    const dir = join(root, 'src', 'content', collection, locale);
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const fm = parseFrontmatter(join(dir, file));
      out.push({ file: `${collection}/${locale}/${file}`, ...fm });
    }
  }
  return out;
}

describe('content translations', () => {
  for (const collection of collections) {
    it(`${collection}: every translationKey has both es and en versions`, () => {
      const entries = entriesFor(collection);
      assert.ok(entries.length > 0, `${collection} must contain entries`);
      const byKey = new Map();
      for (const entry of entries) {
        assert.ok(entry.translationKey, `${entry.file} must define translationKey`);
        assert.ok(['es', 'en'].includes(entry.locale), `${entry.file} must define locale es|en`);
        if (!byKey.has(entry.translationKey)) byKey.set(entry.translationKey, new Set());
        byKey.get(entry.translationKey).add(entry.locale);
      }
      for (const [key, locales] of byKey) {
        assert.ok(locales.has('es'), `${collection}:${key} is missing the es version`);
        assert.ok(locales.has('en'), `${collection}:${key} is missing the en version`);
      }
    });
  }
});
