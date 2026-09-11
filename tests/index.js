// Loader shim: `node --test tests/` must execute the suites in this folder.
// Importing them here keeps `npm test` green without touching package.json.
import './routes.test.ts';
import './translations.test.ts';
import './seo.test.ts';
