import type { ComponentPropsWithoutRef } from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /** Physical scale — maps to `--iso-size-icon-*` for both width and height. @default 'md' */
  size?: IconSize;
  /**
   * Accessible label. Omitted (the default), the icon is decorative: `aria-hidden="true"` and
   * invisible to assistive technology. Provided, the svg renders `role="img"` + `aria-label`
   * instead — the escape hatch for icons that are the content.
   */
  label?: string;
}
