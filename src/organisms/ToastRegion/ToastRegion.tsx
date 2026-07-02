import { forwardRef } from 'react';
import type { ToastRegionProps } from './ToastRegion.types';
import styles from './ToastRegion.module.css';

/**
 * Positions and stacks `Toast` molecules in a fixed viewport corner. Stateless by design:
 * there is deliberately no ToastProvider — a provider would own queue state, which principle 1
 * forbids. The consumer holds the queue (an array in their state) and renders
 * `<ToastRegion>{queue.map(...)}</ToastRegion>`; dismissal is their `onDismiss` removing an
 * entry. Announcements come from each Toast's own `role="status"`/`role="alert"` — the region
 * intentionally adds no `aria-live` of its own, so nothing is announced twice.
 */
export const ToastRegion = forwardRef<HTMLElement, ToastRegionProps>(function ToastRegion(
  { placement = 'bottom-end', label = 'Notifications', className, children, ...rest },
  ref,
) {
  const classes = [styles.region, styles[`placement-${placement}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <section aria-label={label} className={classes} ref={ref} {...rest}>
      {children}
    </section>
  );
});
