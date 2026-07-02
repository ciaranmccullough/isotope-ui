/**
 * Regenerates src/tokens/tokens.css from the TypeScript token modules.
 * Run via `pnpm build:tokens`.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildTokensCss } from '../src/tokens/cssVariables';

const here = dirname(fileURLToPath(import.meta.url));
const target = join(here, '..', 'src', 'tokens', 'tokens.css');

writeFileSync(target, buildTokensCss(), 'utf8');
console.log(`tokens: wrote ${target}`);
