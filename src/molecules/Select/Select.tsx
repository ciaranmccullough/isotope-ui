import { forwardRef } from 'react';
import type { SelectProps } from './Select.types';
import styles from './Select.module.css';

/**
 * Native `<select>` styled via tokens — platform-native by design: the UA's dropdown arrow and
 * popup are kept (no `appearance: none`, no custom chevron — the browser draws those well).
 * Pain points removed: uncontrolled by construction (`value` is not a prop — use `defaultValue`
 * and read via the forwarded ref or `FormData`), and `invalid` maps to `aria-invalid` + critical
 * border in one prop. The native option-count `size` attribute is available as `htmlSize`
 * because `size` is the variant prop. Children are native `<option>`/`<optgroup>` elements;
 * `multiple` passes through and the listbox height then behaves natively.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = 'md', invalid = false, htmlSize, className, ...rest },
  ref,
) {
  const classes = [styles.select, styles[`size-${size}`], invalid && styles.invalid, className]
    .filter(Boolean)
    .join(' ');

  return (
    <select
      ref={ref}
      className={classes}
      size={htmlSize}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
});
