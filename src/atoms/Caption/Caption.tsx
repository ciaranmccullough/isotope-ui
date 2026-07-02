import { forwardRef } from 'react';
import type { CaptionProps } from './Caption.types';
import styles from './Caption.module.css';

/**
 * Native `<caption>` for tables. Pain point removed: `caption-side` and `text-align` are exposed
 * as typed, token-styled variants instead of ad-hoc CSS. Must be the first child of a `<table>`;
 * it provides the table's accessible name.
 */
export const Caption = forwardRef<HTMLTableCaptionElement, CaptionProps>(function Caption(
  { align = 'start', side = 'top', className, ...rest },
  ref,
) {
  const classes = [styles.caption, styles[`align-${align}`], styles[`side-${side}`], className]
    .filter(Boolean)
    .join(' ');

  return <caption ref={ref} className={classes} {...rest} />;
});
