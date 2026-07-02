import type { ComponentPropsWithoutRef } from 'react';

export type SkeletonShape = 'text' | 'rect' | 'circle';

export interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Placeholder silhouette. `text` is a 1em-tall line (radius-sm), `rect` a rounded
   * rectangle (radius-md), `circle` a circle (radius-full, equal width/height).
   * @default 'text'
   */
  shape?: SkeletonShape;
  /**
   * CSS width applied via inline style. Content-shaped, so consumer-supplied — prefer
   * token vars, e.g. `width="var(--iso-size-avatar-md)"`.
   */
  width?: string;
  /**
   * CSS height applied via inline style. Content-shaped, so consumer-supplied — prefer
   * token vars, e.g. `height="var(--iso-size-control-md)"`.
   */
  height?: string;
}
