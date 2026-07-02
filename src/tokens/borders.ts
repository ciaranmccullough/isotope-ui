/**
 * Border and focus-ring dimensions. CSS: `--iso-border-width-<key>`,
 * `--iso-focus-ring-width`, `--iso-focus-ring-offset`.
 * (The focus-ring color lives in colors.ts as `--iso-color-focus-ring`.)
 */
export const borderWidth = {
  '1': '1px',
  '2': '2px',
} as const;

export const focusRing = {
  width: '2px',
  offset: '2px',
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
export type FocusRingToken = keyof typeof focusRing;
