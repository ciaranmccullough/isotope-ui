import type { ComponentPropsWithoutRef } from 'react';

export type VideoRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type VideoFit = 'cover' | 'contain';

export interface VideoProps extends ComponentPropsWithoutRef<'video'> {
  /** Corner rounding, mapped to `--iso-radius-*`. @default 'none' */
  radius?: VideoRadius;
  /** `object-fit` behavior. Unset leaves the browser default (`contain`). */
  fit?: VideoFit;
  /**
   * CSS `aspect-ratio` (e.g. `'16 / 9'`), applied as an inline style. Wins over
   * `style.aspectRatio` when both are given.
   */
  aspectRatio?: string;
}
