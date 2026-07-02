/**
 * Post-build: ship the token sheet standalone as dist/tokens.css
 * (dist/isotope-ui.css already includes it).
 */
import { copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
copyFileSync(
  join(here, '..', 'src', 'tokens', 'tokens.css'),
  join(here, '..', 'dist', 'tokens.css'),
);
console.log('postbuild: copied tokens.css → dist/tokens.css');
