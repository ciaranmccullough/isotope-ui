import { forwardRef } from 'react';
import type { IconProps } from './Icon.types';
import styles from './Icon.module.css';

/**
 * Native `<svg>` with token-mapped sizes. Pain points removed: decorative by default
 * (`aria-hidden="true"` + `focusable="false"`, so it is silent to assistive technology and never
 * a legacy tab stop), `viewBox` defaults to `"0 0 24 24"`, and the svg fills with `currentColor`
 * so it inherits the surrounding text color. Pass `label` when the icon carries meaning:
 * it renders `role="img"` + `aria-label` instead.
 *
 * Children are the SVG contents (`<path>`, `<circle>`, …). Stroke-based children must set
 * `stroke="currentColor" fill="none"` themselves.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { size = 'md', viewBox = '0 0 24 24', label, className, ...rest },
  ref,
) {
  const classes = [styles.icon, styles[`size-${size}`], className].filter(Boolean).join(' ');

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      focusable="false"
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={classes}
      {...rest}
    />
  );
});
