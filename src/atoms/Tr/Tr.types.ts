import type { ComponentPropsWithoutRef } from 'react';

export interface TrProps extends ComponentPropsWithoutRef<'tr'> {
  /**
   * Visual affordance for clickable rows: token-mapped hover background with a motion-token
   * transition (removed under `prefers-reduced-motion`). Does not add handlers — wire
   * `onClick`/keyboard per your pattern. @default false
   */
  interactive?: boolean;
  /**
   * Marks the row selected: accent background and the `aria-selected` state. The attribute is
   * rendered only when the prop is provided (true or false) — only use it where the table
   * pattern allows `aria-selected` (e.g. `role="grid"`); leave unset in plain tables and style
   * via CSS only. @default undefined (no attribute)
   */
  selected?: boolean;
}
