import type { ComponentPropsWithoutRef } from 'react';

export type ThScope = 'col' | 'row' | 'colgroup' | 'rowgroup';
export type ThAlign = 'start' | 'center' | 'end';

export interface ThProps extends Omit<ComponentPropsWithoutRef<'th'>, 'scope' | 'align'> {
  /**
   * Which cells this header describes. Defaults to `'col'` — a forgotten `scope` is the most
   * common table accessibility bug. Row headers pass `'row'`; spanned group headers pass
   * `'colgroup'` / `'rowgroup'`.
   * @default 'col'
   */
  scope?: ThScope;
  /** Horizontal text alignment (logical values, RTL-aware). @default 'start' */
  align?: ThAlign;
  /**
   * Numeric column header: tabular numerals plus end alignment so the header lines up with the
   * digits below it. Takes precedence over `align`.
   * @default false
   */
  numeric?: boolean;
}
