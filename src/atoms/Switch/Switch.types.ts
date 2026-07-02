import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * `checked` is omitted to enforce uncontrolled usage: consumers set `defaultChecked` and read the
 * current state through the forwarded ref (or `FormData`), never by controlling the input.
 * `type` and `role` are fixed by the component (`checkbox` / `switch`), and the native char-width
 * `size` attribute is dropped because `size` is the variant prop (it has no effect on checkboxes).
 */
export interface SwitchProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'checked' | 'type' | 'size' | 'role'
> {
  /** Control size. @default 'md' */
  size?: SwitchSize;
  /**
   * Visible label text, rendered inside the wrapping `<label>` after the control.
   * When omitted, consumers MUST pass `aria-label` so the switch keeps an accessible name.
   */
  children?: ReactNode;
}
