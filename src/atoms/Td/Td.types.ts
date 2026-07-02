import type { ComponentPropsWithoutRef } from 'react';

export type TdAlign = 'start' | 'center' | 'end';

// Native 'align' is the deprecated HTML attribute ('left'/'right'/'justify'/'char') — omitted
// and replaced by the typed logical-value variant, matching Th.
export interface TdProps extends Omit<ComponentPropsWithoutRef<'td'>, 'align'> {
  /** Horizontal text alignment (`text-align`). @default 'start' */
  align?: TdAlign;
  /**
   * Numeric cell: tabular figures (`font-variant-numeric: tabular-nums`) plus end alignment so
   * digit columns line up. Takes precedence over `align`. @default false
   */
  numeric?: boolean;
}
