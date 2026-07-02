import { Children, cloneElement, forwardRef, isValidElement, useId } from 'react';
import { RadioButton } from '../../atoms/RadioButton';
import type { RadioButtonProps } from '../../atoms/RadioButton';
import type { RadioGroupProps } from './RadioGroup.types';
import styles from './RadioGroup.module.css';

/**
 * Native `<fieldset>`/`<legend>` grouping of `RadioButton` atoms. Pain point removed: shared
 * `name` (and optional `size`) bookkeeping — both are injected into every direct `RadioButton`
 * child, while a child's own explicit `name`/`size` still wins. Non-element children pass
 * through untouched. Uncontrolled throughout: selection lives in the DOM (read via refs or
 * `FormData`), and mutual exclusion plus arrow-key roving stay entirely native. `error` renders
 * below the options and is wired to the fieldset via `aria-describedby`. No state, no context —
 * `useId` only generates the error id.
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  {
    legend,
    name,
    direction = 'vertical',
    error,
    size,
    className,
    children,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const errorId = useId();
  const describedBy =
    [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(' ') || undefined;

  const classes = [styles['radio-group'], styles[`direction-${direction}`], className]
    .filter(Boolean)
    .join(' ');

  const options = Children.map(children, (child) => {
    if (!isValidElement<RadioButtonProps>(child) || child.type !== RadioButton) {
      return child;
    }
    const injected: Partial<RadioButtonProps> = {};
    if (child.props.name === undefined) {
      injected.name = name;
    }
    if (size !== undefined && child.props.size === undefined) {
      injected.size = size;
    }
    return cloneElement(child, injected);
  });

  return (
    <fieldset ref={ref} className={classes} aria-describedby={describedBy} {...rest}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.options}>{options}</div>
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </fieldset>
  );
});
