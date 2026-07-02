import { forwardRef } from 'react';
import type { SwitchProps } from './Switch.types';
import styles from './Switch.module.css';

/**
 * Native `<input type="checkbox" role="switch">` wrapped in its `<label>`. Pain points removed:
 * it is uncontrolled by construction (`checked` is not a prop — use `defaultChecked` and read the
 * state via the forwarded ref or `FormData`), and label association is built in — `children`
 * renders inside the wrapping `<label>`, so the text names the switch and toggles it on click
 * with no `id`/`htmlFor` wiring. When rendered without `children`, pass `aria-label`.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { size = 'md', className, children, ...rest },
  ref,
) {
  const classes = [styles.switch, styles[`size-${size}`], className].filter(Boolean).join(' ');

  return (
    <label className={classes}>
      <input ref={ref} type="checkbox" role="switch" className={styles.input} {...rest} />
      {children}
    </label>
  );
});
