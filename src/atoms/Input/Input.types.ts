import type { ComponentPropsWithoutRef } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

/**
 * `value` and `checked` are omitted to enforce uncontrolled usage: consumers set `defaultValue`
 * (or `defaultChecked`, which stays available) and read the current value through the forwarded
 * ref (or `FormData`), never by controlling the input. `children` is omitted because `<input>`
 * is a void element — children would type-check but crash at runtime. The native char-width
 * `size` attribute is omitted too — `size` is the variant prop — and re-exposed as `htmlSize`.
 */
export interface InputProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'size' | 'checked' | 'children'
> {
  /** Control size. @default 'md' */
  size?: InputSize;
  /** Marks the field invalid: sets `aria-invalid` and a critical border. @default false */
  invalid?: boolean;
  /** The native `<input size>` char-width attribute, renamed because `size` is the variant prop. */
  htmlSize?: number;
}
