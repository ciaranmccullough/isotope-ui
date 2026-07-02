import { forwardRef } from 'react';
import type { SkeletonProps } from './Skeleton.types';
import styles from './Skeleton.module.css';

/**
 * Pure-CSS shimmer placeholder for content that is still loading. Decorative by
 * definition: it is always removed from the accessibility tree with `aria-hidden="true"`
 * (set after the prop spread so it cannot be overridden). The surrounding region should
 * carry `aria-busy="true"` and an accessible name while loading — see `CLAUDE.md`.
 *
 * Dimensions are content-shaped and therefore consumer-supplied via `width`/`height`
 * (inline style; token vars preferred, e.g. `width="var(--iso-size-avatar-md)"`).
 * A consumer `style` object is merged last, so it can still override anything.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { shape = 'text', width, height, className, style, ...rest },
  ref,
) {
  const classes = [styles.skeleton, styles[`shape-${shape}`], className].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      style={{ width, height, ...style }}
      {...rest}
      aria-hidden="true"
    />
  );
});
