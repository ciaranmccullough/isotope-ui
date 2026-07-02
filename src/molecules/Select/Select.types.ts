import type { ComponentPropsWithoutRef } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

/**
 * `value` is omitted to enforce uncontrolled usage: consumers set `defaultValue` and read the
 * current selection through the forwarded ref (or `FormData`), never by controlling the select.
 * The native option-count `size` attribute is omitted too — `size` is the variant prop — and
 * re-exposed as `htmlSize`. `children` are native `<option>`/`<optgroup>` elements; the options
 * are never re-implemented.
 */
export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'value' | 'size'> {
  /** Control size. @default 'md' */
  size?: SelectSize;
  /** Marks the field invalid: sets `aria-invalid` and a critical border. @default false */
  invalid?: boolean;
  /** The native `<select size>` visible-option-count attribute, renamed because `size` is the variant prop. */
  htmlSize?: number;
}
