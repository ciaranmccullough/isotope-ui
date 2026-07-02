import type { ComponentPropsWithoutRef } from 'react';

export type RadioButtonSize = 'sm' | 'md' | 'lg';

export interface RadioButtonProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'checked' | 'type' | 'size'
> {
  /** Control size (radio dimensions only; label typography is fixed). @default 'md' */
  size?: RadioButtonSize;
}
