import { forwardRef } from 'react';
import { Button } from '../../atoms/Button';
import type { ChipProps } from './Chip.types';
import styles from './Chip.module.css';

/**
 * A pill-shaped status/filter label: tone-tinted `<span>` with an optional decorative leading
 * dot and an optional remove affordance composing `Button` (the Toast dismiss pattern). Dumb
 * throughout — `onRemove` only reports intent; the consumer owns the list the chip came from.
 * For a plain non-interactive label, use the Tag atom instead.
 *
 * Ref forwards to the root `<span>` (the remove button is conditional, so the root is the
 * stable target — same rationale as Toast).
 */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  { tone = 'neutral', dot = false, onRemove, removeLabel = 'Remove', className, children, ...rest },
  ref,
) {
  const classes = [styles.chip, styles[`tone-${tone}`], className].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={classes} {...rest}>
      {dot ? <span aria-hidden="true" className={styles.dot} /> : null}
      {children}
      {onRemove ? (
        <Button
          aria-label={removeLabel}
          className={styles.remove}
          emphasis="ghost"
          onClick={onRemove}
          size="sm"
          tone={tone}
        >
          ×
        </Button>
      ) : null}
    </span>
  );
});
