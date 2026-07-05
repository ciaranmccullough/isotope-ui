import { forwardRef } from 'react';
import type { CalendarProps } from './Calendar.types';
import styles from './Calendar.module.css';

/**
 * Native date `<input>` — `type="date"` (a calendar day) or `type="datetime-local"` (a day + a
 * wall-clock time) — with token-mapped variants. Platform-native by design: the browser draws the
 * calendar/clock popover, parses the locale display format, and validates the value. Pain points
 * removed: uncontrolled by construction (`value` is not a prop — set `defaultValue` in the input's
 * `yyyy-mm-dd` / `yyyy-mm-ddThh:mm` value format and read via the forwarded ref or `FormData`), and
 * `invalid` maps to `aria-invalid` + critical border in one prop. `min` / `max` / `step` pass
 * straight through to the native input.
 */
export const Calendar = forwardRef<HTMLInputElement, CalendarProps>(function Calendar(
  { type = 'date', size = 'md', invalid = false, className, ...rest },
  ref,
) {
  const classes = [styles.calendar, styles[`size-${size}`], invalid && styles.invalid, className]
    .filter(Boolean)
    .join(' ');

  return (
    <input
      ref={ref}
      type={type}
      className={classes}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
});
