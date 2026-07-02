import type { ComponentPropsWithoutRef } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

/**
 * `value` is omitted to enforce uncontrolled usage: consumers set `defaultValue` and read the
 * current value through the forwarded ref (or `FormData`), never by controlling the input.
 * The native char-width `size` attribute is omitted too — `size` is the variant prop — and
 * re-exposed as `htmlSize`.
 */
export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'size'> {
  /** Control size. @default 'md' */
  size?: InputSize;
  /** Marks the field invalid: sets `aria-invalid` and a critical border. @default false */
  invalid?: boolean;
  /** The native `<input size>` char-width attribute, renamed because `size` is the variant prop. */
  htmlSize?: number;
}
