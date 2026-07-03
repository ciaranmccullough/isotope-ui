import type { ComponentPropsWithoutRef } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'checked' | 'type' | 'size'
> {
  /** Control size (checkbox dimensions only; label typography is fixed). @default 'md' */
  size?: CheckboxSize;
}
