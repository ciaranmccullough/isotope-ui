import type { ComponentPropsWithoutRef } from 'react';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
export type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * `children` is omitted because `<img>` is a void element — children would type-check but
 * crash at runtime.
 */
export interface ImageProps extends Omit<ComponentPropsWithoutRef<'img'>, 'children'> {
  /**
   * Alternative text. Required — the type system will not let you forget it.
   * Pass `""` (empty string) for purely decorative images.
   */
  alt: string;
  /**
   * CSS `aspect-ratio` applied as an inline style (content-shaped, so a prop — not a token
   * variant). Example: `'16 / 9'`. An `aspectRatio` set via the `style` prop wins over this.
   */
  aspectRatio?: string;
  /** `object-fit` behavior. No default — the platform default (`fill`) applies. */
  fit?: ImageFit;
  /** Corner radius token. @default 'none' */
  radius?: ImageRadius;
}
