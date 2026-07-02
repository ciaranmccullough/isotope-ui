/**
 * Fixed element sizes. CSS: `--iso-size-<key>`.
 * `control-*` = interactive control heights (buttons, inputs, selects).
 */
export const sizing = {
  'control-sm': '2rem',
  'control-md': '2.5rem',
  'control-lg': '3rem',
  'icon-xs': '0.75rem',
  'icon-sm': '1rem',
  'icon-md': '1.25rem',
  'icon-lg': '1.5rem',
  'icon-xl': '2rem',
  'avatar-xs': '1.5rem',
  'avatar-sm': '2rem',
  'avatar-md': '2.5rem',
  'avatar-lg': '3rem',
  'avatar-xl': '4rem',
  'container-xs': '28rem',
  'container-sm': '40rem',
  'container-md': '48rem',
  'container-lg': '64rem',
  'container-xl': '80rem',
} as const;

export type SizingToken = keyof typeof sizing;
