import { forwardRef } from 'react';
import type { FooterProps } from './Footer.types';
import styles from './Footer.module.css';

/**
 * Site footer: children (compose List/Link/Text into columns) + an optional `legal` fine-print
 * slot. Wraps `<footer>` — the contentinfo landmark when used at page level. Pure layout.
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  { legal, className, children, ...rest },
  ref,
) {
  const classes = [styles.footer, className].filter(Boolean).join(' ');

  return (
    <footer className={classes} ref={ref} {...rest}>
      {children !== undefined && <div className={styles.columns}>{children}</div>}
      {legal !== undefined && <div className={styles.legal}>{legal}</div>}
    </footer>
  );
});
