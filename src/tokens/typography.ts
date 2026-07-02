/**
 * Typography tokens. CSS:
 * `--iso-font-family-<key>`, `--iso-font-size-<key>`, `--iso-font-weight-<key>`,
 * `--iso-line-height-<key>`, `--iso-letter-spacing-<key>`.
 */
export const typography = {
  fontFamily: {
    sans: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
  letterSpacing: {
    tight: '-0.01em',
    normal: '0em',
    wide: '0.02em',
  },
} as const;

export type FontFamilyToken = keyof typeof typography.fontFamily;
export type FontSizeToken = keyof typeof typography.fontSize;
export type FontWeightToken = keyof typeof typography.fontWeight;
export type LineHeightToken = keyof typeof typography.lineHeight;
export type LetterSpacingToken = keyof typeof typography.letterSpacing;
