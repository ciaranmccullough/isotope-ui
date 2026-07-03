import { forwardRef } from 'react';
import type { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.css';

/**
 * Native `<input type="checkbox">` wrapped in its `<label>`. The platform draws the control —
 * we only set `accent-color`, dimensions, and label typography. Pain point removed: no
 * `id`/`htmlFor` pairing needed; wrapping associates label and input implicitly.
 * Uncontrolled: no `checked` prop — use `defaultChecked` and read state via the ref or
 * `FormData`. The mixed state is the platform's `indeterminate` DOM property (not an
 * attribute): set it through the ref (`ref.current.indeterminate = true`).
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { size = 'md', className, children, ...rest },
  ref,
) {
  const classes = [styles.checkbox, styles[`size-${size}`], className].filter(Boolean).join(' ');

  return (
    <label className={classes}>
      <input ref={ref} type="checkbox" className={styles.input} {...rest} />
      {children}
    </label>
  );
});
