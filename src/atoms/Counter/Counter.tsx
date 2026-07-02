import { forwardRef, useRef } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import type { CounterProps } from './Counter.types';
import styles from './Counter.module.css';

/**
 * Numeric stepper: `Button` − / `Input type="number"` / `Button` +. The atoms tier's single
 * sanctioned composition (see src/atoms/CLAUDE.md). Uncontrolled: the input's DOM value is the
 * source of truth, read via ref/FormData; the step buttons drive the native
 * `stepUp()`/`stepDown()` algorithms (min/max/step clamping comes from the platform for free).
 *
 * The internal `useRef` holds a DOM node reference for those native calls — it stores no UI
 * state. Stepping dispatches a bubbling `input` event so consumer `onChange` listeners observe
 * the update (the native methods do not fire events themselves).
 */
export const Counter = forwardRef<HTMLInputElement, CounterProps>(function Counter(
  {
    size = 'md',
    decrementLabel = 'Decrease',
    incrementLabel = 'Increase',
    className,
    disabled,
    ...rest
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setRefs = (node: HTMLInputElement | null): void => {
    inputRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const stepBy = (direction: 'down' | 'up'): void => {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    if (direction === 'up') {
      input.stepUp();
    } else {
      input.stepDown();
    }
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };

  return (
    <div className={[styles.counter, className].filter(Boolean).join(' ')}>
      <Button
        aria-label={decrementLabel}
        className={styles['step-button']}
        disabled={disabled}
        emphasis="outline"
        onClick={() => stepBy('down')}
        size={size}
        tone="neutral"
      >
        −
      </Button>
      <Input
        className={styles.input}
        disabled={disabled}
        ref={setRefs}
        size={size}
        type="number"
        {...rest}
      />
      <Button
        aria-label={incrementLabel}
        className={styles['step-button']}
        disabled={disabled}
        emphasis="outline"
        onClick={() => stepBy('up')}
        size={size}
        tone="neutral"
      >
        +
      </Button>
    </div>
  );
});
