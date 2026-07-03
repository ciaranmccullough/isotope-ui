import type { ComponentPropsWithoutRef } from 'react';
import type { Tone } from '../../tokens';

export type TagTone = Tone;

export interface TagProps extends ComponentPropsWithoutRef<'span'> {
  /** Semantic color intent — subtle background + matching foreground. @default 'neutral' */
  tone?: TagTone;
}
