import { forwardRef } from 'react';
import type { TdProps } from './Td.types';
import styles from './Td.module.css';

/**
 * Native `<td>` data cell. Pain points removed: alignment is a typed variant instead of ad-hoc
 * CSS, and `numeric` opts into tabular figures + end alignment so digit columns line up
 * (`numeric` takes precedence over `align`). Must be rendered inside a `<tr>`.
 */
export const Td = forwardRef<HTMLTableCellElement, TdProps>(function Td(
  { align = 'start', numeric = false, className, ...rest },
  ref,
) {
  const classes = [styles.td, styles[`align-${align}`], numeric && styles.numeric, className]
    .filter(Boolean)
    .join(' ');

  return <td ref={ref} className={classes} {...rest} />;
});
