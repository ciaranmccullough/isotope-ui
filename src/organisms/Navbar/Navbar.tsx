import { forwardRef } from 'react';
import type { NavbarProps } from './Navbar.types';
import styles from './Navbar.module.css';

/**
 * Site navigation bar: brand slot · nav items (children — compose List/Link) · actions slot.
 * Wraps `<nav>`; the default `aria-label` "Main" distinguishes it from other nav landmarks.
 * Pure layout: no menu/collapse state — responsive behavior belongs to the consumer.
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(function Navbar(
  {
    brand,
    actions,
    sticky = false,
    'aria-label': ariaLabel = 'Main',
    className,
    children,
    ...rest
  },
  ref,
) {
  const classes = [styles.navbar, sticky && styles.sticky, className].filter(Boolean).join(' ');

  return (
    <nav aria-label={ariaLabel} className={classes} ref={ref} {...rest}>
      {brand !== undefined && <div className={styles.brand}>{brand}</div>}
      {children}
      {actions !== undefined && <div className={styles.actions}>{actions}</div>}
    </nav>
  );
});
