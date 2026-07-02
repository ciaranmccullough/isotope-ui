import { forwardRef } from 'react';
import type { ProgressProps } from './Progress.types';
import styles from './Progress.module.css';

/**
 * Native `<progress>` with token-mapped variants. Pain points removed: `max` defaults to `100`
 * (the platform default of `1` silently clamps percentage-style values), and the indeterminate
 * state (no `value` prop) shows a looping sheen instead of an empty track.
 *
 * `<progress>` has no accessible name of its own — consumers must label it (`aria-label` here,
 * or an associated label via FormField).
 */
export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(function Progress(
  { tone = 'accent', size = 'md', max = 100, className, ...rest },
  ref,
) {
  const classes = [styles.progress, styles[`tone-${tone}`], styles[`size-${size}`], className]
    .filter(Boolean)
    .join(' ');

  return <progress ref={ref} max={max} className={classes} {...rest} />;
});
