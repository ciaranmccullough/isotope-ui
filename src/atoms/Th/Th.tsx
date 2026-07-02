import { forwardRef } from 'react';
import type { ThProps } from './Th.types';
import styles from './Th.module.css';

/**
 * Native `<th>` header cell with token-mapped alignment. Pain point removed: `scope` defaults to
 * `"col"` (devs forget it, breaking screen-reader column association); row headers pass
 * `scope="row"`. `numeric` applies tabular numerals + end alignment and takes precedence over
 * `align`.
 */
export const Th = forwardRef<HTMLTableCellElement, ThProps>(function Th(
  { scope = 'col', align = 'start', numeric = false, className, ...rest },
  ref,
) {
  const classes = [styles.th, styles[`align-${align}`], numeric && styles.numeric, className]
    .filter(Boolean)
    .join(' ');

  return <th ref={ref} scope={scope} className={classes} {...rest} />;
});
