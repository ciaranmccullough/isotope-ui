import { forwardRef } from 'react';
import type { ImageProps } from './Image.types';
import styles from './Image.module.css';

/**
 * Native `<img>` with modern-platform defaults. Pain points removed:
 *
 * - `loading` defaults to `"lazy"` and `decoding` to `"async"`.
 * - If `fetchPriority="high"` is passed, the default `loading` flips to `"eager"` — a
 *   high-priority image should not lazy-load.
 * - Explicit `loading`/`decoding` props always win over both defaults.
 * - `alt` is required at the type level (`""` for decorative images).
 *
 * `srcSet`, `sizes` and `fetchPriority` pass through natively (React 19 supports the
 * camelCase `fetchPriority` prop).
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    alt,
    aspectRatio,
    fit,
    radius = 'none',
    fetchPriority,
    loading = fetchPriority === 'high' ? 'eager' : 'lazy',
    decoding = 'async',
    className,
    style,
    ...rest
  },
  ref,
) {
  const classes = [
    styles.image,
    fit ? styles[`fit-${fit}`] : undefined,
    styles[`radius-${radius}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <img
      ref={ref}
      alt={alt}
      className={classes}
      style={aspectRatio !== undefined ? { aspectRatio, ...style } : style}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...rest}
    />
  );
});
