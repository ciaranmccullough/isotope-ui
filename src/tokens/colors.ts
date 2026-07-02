/**
 * Color tokens, in two layers:
 *
 * 1. `palette` — raw scales. CSS: `--iso-color-<name>-<shade>` (e.g. `--iso-color-blue-600`).
 * 2. `colors` — semantic tokens components actually use. CSS: `--iso-color-<key>`.
 *
 * Components must reference semantic tokens wherever one exists; the palette is the
 * substrate themes remap.
 */
export const palette = {
  white: '#ffffff',
  black: '#000000',
  gray: {
    '50': '#f9fafb',
    '100': '#f3f4f6',
    '200': '#e5e7eb',
    '300': '#d1d5db',
    '400': '#9ca3af',
    '500': '#6b7280',
    '600': '#4b5563',
    '700': '#374151',
    '800': '#1f2937',
    '900': '#111827',
  },
  blue: {
    '50': '#eff6ff',
    '100': '#dbeafe',
    '200': '#bfdbfe',
    '300': '#93c5fd',
    '400': '#60a5fa',
    '500': '#3b82f6',
    '600': '#2563eb',
    '700': '#1d4ed8',
    '800': '#1e40af',
    '900': '#1e3a8a',
  },
  green: {
    '50': '#f0fdf4',
    '100': '#dcfce7',
    '200': '#bbf7d0',
    '300': '#86efac',
    '400': '#4ade80',
    '500': '#22c55e',
    '600': '#16a34a',
    '700': '#15803d',
    '800': '#166534',
    '900': '#14532d',
  },
  red: {
    '50': '#fef2f2',
    '100': '#fee2e2',
    '200': '#fecaca',
    '300': '#fca5a5',
    '400': '#f87171',
    '500': '#ef4444',
    '600': '#dc2626',
    '700': '#b91c1c',
    '800': '#991b1b',
    '900': '#7f1d1d',
  },
  amber: {
    '50': '#fffbeb',
    '100': '#fef3c7',
    '200': '#fde68a',
    '300': '#fcd34d',
    '400': '#fbbf24',
    '500': '#f59e0b',
    '600': '#d97706',
    '700': '#b45309',
    '800': '#92400e',
    '900': '#78350f',
  },
} as const;

/** Semantic color intents shared across the library's `tone` variants. */
export const tones = ['neutral', 'accent', 'positive', 'critical', 'caution'] as const;
export type Tone = (typeof tones)[number];

export const colors = {
  // Surfaces
  surface: palette.white,
  'surface-raised': palette.white,
  'surface-sunken': palette.gray['50'],
  backdrop: 'rgb(17 24 39 / 0.5)',

  // Text
  text: palette.gray['900'],
  'text-secondary': palette.gray['600'],
  'text-muted': palette.gray['500'],
  'text-disabled': palette.gray['400'],
  'text-inverse': palette.white,
  'text-link': palette.blue['600'],
  'text-link-hover': palette.blue['700'],

  // Borders & focus
  border: palette.gray['200'],
  'border-strong': palette.gray['300'],
  // Boundary of form controls where the border is the sole visual indicator — must stay >= 3:1
  // against surface (WCAG 1.4.11). gray-500 = 4.83:1 on white.
  'border-control': palette.gray['500'],
  'focus-ring': palette.blue['500'],

  // Tone: neutral
  'neutral-solid-bg': palette.gray['800'],
  'neutral-solid-bg-hover': palette.gray['700'],
  'neutral-solid-bg-active': palette.gray['900'],
  'neutral-solid-fg': palette.white,
  'neutral-subtle-bg': palette.gray['100'],
  'neutral-subtle-bg-hover': palette.gray['200'],
  'neutral-subtle-fg': palette.gray['800'],
  'neutral-border': palette.gray['400'],

  // Tone: accent
  'accent-solid-bg': palette.blue['600'],
  'accent-solid-bg-hover': palette.blue['700'],
  'accent-solid-bg-active': palette.blue['800'],
  'accent-solid-fg': palette.white,
  'accent-subtle-bg': palette.blue['50'],
  'accent-subtle-bg-hover': palette.blue['100'],
  'accent-subtle-fg': palette.blue['700'],
  'accent-border': palette.blue['300'],

  // Tone: positive (starts at green-700 — white on green-600 is only 3.30:1, below AA)
  'positive-solid-bg': palette.green['700'],
  'positive-solid-bg-hover': palette.green['800'],
  'positive-solid-bg-active': palette.green['900'],
  'positive-solid-fg': palette.white,
  'positive-subtle-bg': palette.green['50'],
  'positive-subtle-bg-hover': palette.green['100'],
  'positive-subtle-fg': palette.green['700'],
  'positive-border': palette.green['300'],

  // Tone: critical
  'critical-solid-bg': palette.red['600'],
  'critical-solid-bg-hover': palette.red['700'],
  'critical-solid-bg-active': palette.red['800'],
  'critical-solid-fg': palette.white,
  'critical-subtle-bg': palette.red['50'],
  'critical-subtle-bg-hover': palette.red['100'],
  'critical-subtle-fg': palette.red['700'],
  'critical-border': palette.red['300'],

  // Tone: caution (dark foreground — amber solid backgrounds need dark text for contrast)
  'caution-solid-bg': palette.amber['400'],
  'caution-solid-bg-hover': palette.amber['500'],
  'caution-solid-bg-active': palette.amber['600'],
  'caution-solid-fg': palette.gray['900'],
  'caution-subtle-bg': palette.amber['50'],
  'caution-subtle-bg-hover': palette.amber['100'],
  'caution-subtle-fg': palette.amber['800'],
  'caution-border': palette.amber['300'],
  // caution-solid-bg (amber-400) is tuned for dark TEXT on it; as a standalone graphic (progress
  // bars, meters) it fails 3:1 non-text contrast. Graphics use this instead (amber-700 = 4.56:1
  // vs the gray-100 track).
  'caution-graphic': palette.amber['700'],
} as const;

export type ColorToken = keyof typeof colors;
