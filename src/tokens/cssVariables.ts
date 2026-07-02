/**
 * Internal: flattens the TS token modules into `--iso-*` CSS custom properties and renders
 * `tokens.css`. Used by `scripts/build-tokens.ts` and the tokens sync test — not part of the
 * public API.
 */
import { spacing } from './spacing';
import { radii } from './radii';
import { palette, colors } from './colors';
import { shadows } from './shadows';
import { borderWidth, focusRing } from './borders';
import { sizing } from './sizing';
import { typography } from './typography';
import { motion } from './motion';
import { zIndex } from './zIndex';
import { breakpoints } from './breakpoints';

export function buildTokenVariables(): Record<string, string> {
  const vars: Record<string, string> = {};
  const set = (name: string, value: string): void => {
    if (name in vars) {
      throw new Error(`Duplicate token name: ${name}`);
    }
    vars[name] = value;
  };
  const add = (prefix: string, group: Record<string, string>): void => {
    for (const [key, value] of Object.entries(group)) {
      set(`--iso-${prefix}-${key}`, value);
    }
  };

  add('spacing', spacing);
  add('radius', radii);

  for (const [name, entry] of Object.entries(palette)) {
    if (typeof entry === 'string') {
      set(`--iso-color-${name}`, entry);
    } else {
      add(`color-${name}`, entry);
    }
  }
  add('color', colors);

  add('shadow', shadows);
  add('size', sizing);
  add('border-width', borderWidth);
  add('focus-ring', focusRing);
  add('font-family', typography.fontFamily);
  add('font-size', typography.fontSize);
  add('font-weight', typography.fontWeight);
  add('line-height', typography.lineHeight);
  add('letter-spacing', typography.letterSpacing);
  add('duration', motion.duration);
  add('easing', motion.easing);
  add('z', zIndex);
  add('breakpoint', breakpoints);

  return vars;
}

export function buildTokensCss(): string {
  const lines = Object.entries(buildTokenVariables()).map(
    ([name, value]) => `  ${name}: ${value};`,
  );
  return [
    '/* GENERATED FILE — do not edit by hand. Run `pnpm build:tokens` to regenerate */',
    '/* from the TypeScript token modules in src/tokens/. */',
    ':root {',
    ...lines,
    '}',
    '',
  ].join('\n');
}
