import { forwardRef } from 'react';
import type { InputProps } from './Input.types';
import styles from './Input.module.css';

/**
 * Native `<input>` with token-mapped variants. Pain points removed: it is uncontrolled by
 * construction (`value` is not a prop — use `defaultValue` and read via the forwarded ref or
 * `FormData`), and `invalid` maps to `aria-invalid` + critical border in one prop. The native
 * char-width `size` attribute is available as `htmlSize` because `size` is the variant prop.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', invalid = false, htmlSize, className, ...rest },
  ref,
) {
  const classes = [styles.input, styles[`size-${size}`], invalid && styles.invalid, className]
    .filter(Boolean)
    .join(' ');

  return (
    <input
      ref={ref}
      className={classes}
      size={htmlSize}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
});
