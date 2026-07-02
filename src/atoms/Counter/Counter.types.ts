import type { ComponentPropsWithoutRef } from 'react';

export type CounterSize = 'sm' | 'md' | 'lg';

export interface CounterProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'size' | 'type' | 'children'
> {
  /** Control size applied to the composed Button + Input. @default 'md' */
  size?: CounterSize;
  /** Accessible name for the decrement button. @default 'Decrease' */
  decrementLabel?: string;
  /** Accessible name for the increment button. @default 'Increase' */
  incrementLabel?: string;
}
