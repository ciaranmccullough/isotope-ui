import type { ComponentPropsWithoutRef } from 'react';

export type CaptionAlign = 'start' | 'center' | 'end';
export type CaptionSide = 'top' | 'bottom';

export interface CaptionProps extends ComponentPropsWithoutRef<'caption'> {
  /** Horizontal text alignment (`text-align`). @default 'start' */
  align?: CaptionAlign;
  /** Table edge the caption renders against (`caption-side`). @default 'top' */
  side?: CaptionSide;
}
