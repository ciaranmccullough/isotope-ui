import { forwardRef } from 'react';
import type { TagProps } from './Tag.types';
import styles from './Tag.module.css';

/**
 * A small non-interactive label for categories and metadata (skill, state, kind). Documented
 * deviation from "native element at the core": HTML has no element for a category label, so the
 * core is a generic `<span>` — the text itself is the semantics, read inline by AT with no role.
 * Non-interactive by design: filtering/removal affordances live in the Chip molecule, and
 * anything clickable belongs in a `Button` or `Link`.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { tone = 'neutral', className, ...rest },
  ref,
) {
  const classes = [styles.tag, styles[`tone-${tone}`], className].filter(Boolean).join(' ');

  return <span ref={ref} className={classes} {...rest} />;
});
