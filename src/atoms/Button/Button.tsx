import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

/**
 * Native `<button>` with token-mapped variants. Pain point removed: `type` defaults to
 * `"button"` (the platform default of `"submit"` causes accidental form submissions).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { tone = 'neutral', emphasis = 'solid', size = 'md', type = 'button', className, ...rest },
  ref,
) {
  const classes = [
    styles.button,
    styles[`tone-${tone}`],
    styles[`emphasis-${emphasis}`],
    styles[`size-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <button ref={ref} type={type} className={classes} {...rest} />;
});
