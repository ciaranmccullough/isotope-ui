import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildTokensCss, buildTokenVariables } from './cssVariables';

describe('design tokens', () => {
  it('keeps tokens.css in sync with the TypeScript token modules', () => {
    const committed = readFileSync(join(__dirname, 'tokens.css'), 'utf8');
    expect(committed.replace(/\r\n/g, '\n')).toBe(buildTokensCss());
  });

  it('emits well-formed custom property names and non-empty values', () => {
    const vars = buildTokenVariables();
    expect(Object.keys(vars).length).toBeGreaterThan(100);
    for (const [name, value] of Object.entries(vars)) {
      expect(name).toMatch(/^--iso-[a-z0-9-]+$/);
      expect(value.trim()).not.toBe('');
      expect(value).not.toContain('undefined');
    }
  });

  it('never collides token names across groups', () => {
    const names = Object.keys(buildTokenVariables());
    expect(new Set(names).size).toBe(names.length);
  });
});
