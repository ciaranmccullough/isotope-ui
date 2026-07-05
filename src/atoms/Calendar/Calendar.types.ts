import type { ComponentPropsWithoutRef } from 'react';

/** The two native date-family controls this component covers. */
export type CalendarType = 'date' | 'datetime-local';

export type CalendarSize = 'sm' | 'md' | 'lg';

/**
 * `value` and `checked` are omitted to enforce uncontrolled usage: consumers set `defaultValue`
 * (in the native `yyyy-mm-dd` / `yyyy-mm-ddThh:mm` format) and read the current value through the
 * forwarded ref (or `FormData`), never by controlling the input. `children` is omitted because
 * `<input>` is a void element — children would type-check but crash at runtime. `type` is narrowed
 * to the two date-family controls and re-exposed with a default. The native char-width `size`
 * attribute is omitted — `size` is the variant prop (and a date field has no meaningful char
 * width; its width is fixed by the locale format).
 */
export interface CalendarProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'size' | 'checked' | 'children' | 'type'
> {
  /** Which native date control to render. @default 'date' */
  type?: CalendarType;
  /** Control size. @default 'md' */
  size?: CalendarSize;
  /** Marks the field invalid: sets `aria-invalid` and a critical border. @default false */
  invalid?: boolean;
}
