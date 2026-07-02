import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import type { AvatarProps } from './Avatar.types';
import styles from './Avatar.module.css';

/**
 * Initials for the fallback: first letter of the first and last words of the name, uppercased.
 * A single word yields a single letter. Pure function — no state, no memoisation.
 */
function getInitials(name: string | undefined): string {
  const words = (name ?? '').trim().split(/\s+/).filter(Boolean);
  const first = words[0];
  if (first === undefined) return '';
  const last = words.length > 1 ? words[words.length - 1] : undefined;
  return `${first.charAt(0)}${last === undefined ? '' : last.charAt(0)}`.toUpperCase();
}

/**
 * Native `<img>` avatar with a stateless initials fallback. Pain points removed: `alt` is
 * required by the types whenever `src` is set, and the no-image case needs no hand-rolled
 * fallback — omit `src` and a `<span role="img">` renders initials computed from `name`.
 * Load errors stay the consumer's job: attach your own `onError` and re-render without `src`;
 * the atom holds zero internal state.
 */
export const Avatar = forwardRef<HTMLImageElement | HTMLSpanElement, AvatarProps>(
  function Avatar(props, ref) {
    if (typeof props.src === 'string') {
      const { src, alt, name: _name, size = 'md', className, ...rest } = props;
      void _name; // `name` only feeds the fallback initials — keep it off the <img> element.
      const classes = [styles.avatar, styles.image, styles[`size-${size}`], className]
        .filter(Boolean)
        .join(' ');
      return (
        <img
          ref={ref as ForwardedRef<HTMLImageElement>}
          src={src}
          alt={alt}
          className={classes}
          {...rest}
        />
      );
    }

    const { src: _src, alt: _alt, name, size = 'md', className, ...rest } = props;
    void _src; // Discriminant props — always undefined in this branch; keep them off the <span>.
    void _alt;
    const classes = [styles.avatar, styles.fallback, styles[`size-${size}`], className]
      .filter(Boolean)
      .join(' ');
    return (
      <span
        ref={ref as ForwardedRef<HTMLSpanElement>}
        role="img"
        aria-label={name}
        className={classes}
        {...rest}
      >
        {getInitials(name)}
      </span>
    );
  },
);
