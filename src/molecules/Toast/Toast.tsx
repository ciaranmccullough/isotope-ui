import { forwardRef, useId } from 'react';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import type { ToastProps } from './Toast.types';
import styles from './Toast.module.css';

/**
 * A single notification unit: tone-edged surface composing `Text` (title/description), an
 * optional consumer `Icon` slot (rendered decorative) and `Button`s (dismiss + consumer action).
 *
 * Stateless by design — no timers, no auto-dismiss, no queueing. The consumer (or the future
 * ToastRegion organism) owns the toast's lifecycle and live-region placement; the unit only
 * carries a sensible announcement default (`role="status"`, overridable to `"alert"`).
 *
 * `useId` wires `aria-labelledby`/`aria-describedby` — id generation, not state.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    tone = 'neutral',
    role = 'status',
    title,
    description,
    icon,
    onDismiss,
    dismissLabel = 'Dismiss',
    action,
    className,
    ...rest
  },
  ref,
) {
  const titleId = useId();
  const descriptionId = useId();

  const classes = [styles.toast, styles[`tone-${tone}`], className].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      role={role}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      className={classes}
      {...rest}
    >
      {icon ? (
        <span aria-hidden="true" className={styles.icon}>
          {icon}
        </span>
      ) : null}
      <div className={styles.body}>
        <Text className={styles.title} id={titleId} size="sm" weight="semibold">
          {title}
        </Text>
        {description ? (
          <Text id={descriptionId} size="sm" tone="secondary">
            {description}
          </Text>
        ) : null}
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
      {onDismiss ? (
        <Button
          aria-label={dismissLabel}
          className={styles.dismiss}
          emphasis="ghost"
          onClick={onDismiss}
          size="sm"
          tone={tone}
        >
          ×
        </Button>
      ) : null}
    </div>
  );
});
