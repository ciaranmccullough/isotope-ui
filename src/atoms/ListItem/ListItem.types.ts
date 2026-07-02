import type { ComponentPropsWithoutRef } from 'react';

export type ListItemMarker = 'inherit' | 'none';

export interface ListItemProps extends ComponentPropsWithoutRef<'li'> {
  /**
   * Marker rendering. `'inherit'` keeps the parent list's marker; `'none'` removes it
   * (`list-style: none`) for items that carry their own visuals. @default 'inherit'
   */
  marker?: ListItemMarker;
}
