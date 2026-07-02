import type { ComponentPropsWithoutRef } from 'react';
import type { Tone } from '../../tokens';

export type ButtonTone = Tone;
export type ButtonEmphasis = 'solid' | 'subtle' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** Semantic color intent. @default 'neutral' */
  tone?: ButtonTone;
  /** Visual weight of the tone. @default 'solid' */
  emphasis?: ButtonEmphasis;
  /** Control size. @default 'md' */
  size?: ButtonSize;
}
