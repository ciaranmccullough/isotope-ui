import { forwardRef } from 'react';
import type { TrProps } from './Tr.types';
import styles from './Tr.module.css';

/**
 * Native `<tr>`. Pain points removed: hover affordance for clickable rows (`interactive`) and
 * selection styling (`selected`) are typed, token-mapped props instead of ad-hoc CSS, and
 * `selected` wires up `aria-selected` — rendered only when the prop is provided, because the
 * state is only valid where the table pattern allows it (e.g. grids).
 */
export const Tr = forwardRef<HTMLTableRowElement, TrProps>(function Tr(
  { interactive = false, selected, className, ...rest },
  ref,
) {
  const classes = [
    styles.tr,
    interactive && styles.interactive,
    selected && styles.selected,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <tr ref={ref} className={classes} aria-selected={selected} {...rest} />;
});
