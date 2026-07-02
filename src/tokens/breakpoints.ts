/**
 * Viewport breakpoints (min-width). CSS: `--iso-breakpoint-<key>`.
 *
 * CSS custom properties cannot appear in `@media` conditions — the CSS variables exist for
 * introspection/tooling. Media queries in component CSS must use the literal value with a
 * comment referencing this file; JS consumers should import these instead.
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type BreakpointToken = keyof typeof breakpoints;
