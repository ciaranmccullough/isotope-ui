import { forwardRef } from 'react';
import type { ListItemProps } from './ListItem.types';
import styles from './ListItem.module.css';

/**
 * Native `<li>` primitive. Deliberately minimal: layout, spacing, and marker decisions
 * belong to the parent list (the List molecule composes this atom). Typography inherits.
 * The one pain point removed: an opt-out of the inherited marker (`marker="none"`) for
 * items that carry their own visuals.
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { marker = 'inherit', className, ...rest },
  ref,
) {
  const classes = [styles['list-item'], styles[`marker-${marker}`], className]
    .filter(Boolean)
    .join(' ');

  return <li ref={ref} className={classes} {...rest} />;
});
