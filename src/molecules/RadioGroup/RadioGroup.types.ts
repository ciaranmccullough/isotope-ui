import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { RadioButtonSize } from '../../atoms/RadioButton';

export type RadioGroupDirection = 'vertical' | 'horizontal';

export interface RadioGroupProps extends Omit<ComponentPropsWithoutRef<'fieldset'>, 'children'> {
  /** Visible group label rendered as the `<legend>` — the group's accessible name. */
  legend: string;
  /**
   * Shared radio `name` injected into every direct `RadioButton` child. A child's own
   * explicit `name` wins. Applied to the radios, not to the `<fieldset>` element.
   */
  name: string;
  /** `RadioButton` children. Non-element children pass through untouched. */
  children?: ReactNode;
  /** Layout of the radio options. @default 'vertical' */
  direction?: RadioGroupDirection;
  /**
   * Error text rendered below the options and announced via `aria-describedby` on the
   * `<fieldset>` (merged with any consumer-provided `aria-describedby`).
   */
  error?: string;
  /** Control size injected into every direct `RadioButton` child. A child's own `size` wins. */
  size?: RadioButtonSize;
}
