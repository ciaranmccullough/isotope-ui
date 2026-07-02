import type { ComponentPropsWithoutRef } from 'react';
import type { Tone } from '../../tokens';

export type ProgressTone = Tone;
export type ProgressSize = 'sm' | 'md';

export interface ProgressProps extends Omit<ComponentPropsWithoutRef<'progress'>, 'children'> {
  /**
   * Amount completed, between `0` and `max`. Omit the prop entirely for the platform's native
   * indeterminate state ("busy, completion unknown").
   */
  value?: number;
  /** Upper bound of the range. @default 100 */
  max?: number;
  /** Semantic color intent of the value bar. @default 'accent' */
  tone?: ProgressTone;
  /** Track thickness. @default 'md' */
  size?: ProgressSize;
}
