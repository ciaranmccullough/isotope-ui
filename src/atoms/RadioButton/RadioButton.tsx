import { forwardRef } from 'react';
import type { RadioButtonProps } from './RadioButton.types';
import styles from './RadioButton.module.css';

/**
 * Native `<input type="radio">` wrapped in its `<label>`. The platform draws the control —
 * we only set `accent-color`, dimensions, and label typography. Pain point removed: no
 * `id`/`htmlFor` pairing needed; wrapping associates label and input implicitly.
 * Uncontrolled: no `checked` prop — use `defaultChecked` and read state via the ref.
 * Grouping (shared `name`) is the consumer's concern until the RadioGroup molecule exists.
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  { size = 'md', className, children, ...rest },
  ref,
) {
  const classes = [styles['radio-button'], styles[`size-${size}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <input ref={ref} type="radio" className={styles.input} {...rest} />
      {children}
    </label>
  );
});
