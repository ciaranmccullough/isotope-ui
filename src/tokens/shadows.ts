/**
 * Elevation shadows. CSS: `--iso-shadow-<key>`.
 * Shadow color derives from gray-900 at low alpha; themes can override the custom properties.
 */
export const shadows = {
  sm: '0 1px 2px 0 rgb(17 24 39 / 0.05)',
  md: '0 4px 8px -2px rgb(17 24 39 / 0.1), 0 2px 4px -2px rgb(17 24 39 / 0.06)',
  lg: '0 12px 24px -4px rgb(17 24 39 / 0.12), 0 4px 8px -4px rgb(17 24 39 / 0.08)',
  overlay: '0 24px 48px -12px rgb(17 24 39 / 0.25)',
} as const;

export type ShadowToken = keyof typeof shadows;
