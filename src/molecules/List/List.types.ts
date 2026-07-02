import type { ComponentPropsWithoutRef } from 'react';
import type { SpacingToken } from '../../tokens';

export type ListElement = 'ul' | 'ol';
export type ListDirection = 'vertical' | 'horizontal';
export type ListMarker = 'none' | 'inherit';

/**
 * Gap between items — a deliberate subset of the spacing scale suited to list layouts.
 * Each value maps 1:1 to `--iso-spacing-<value>`.
 */
export type ListGap = Extract<SpacingToken, '0' | '1' | '2' | '3' | '4' | '6' | '8'>;

/**
 * Documented typing limitation: the native prop surface is `ComponentPropsWithoutRef<'ul'>`
 * rather than a `'ul'`/`'ol'` union, so `'ol'`-specific attributes are not inherited. The two
 * useful ones (`start`, `reversed`) are re-exposed as explicit props below and applied only
 * when `as="ol"` (they are dropped, never rendered, on a `<ul>`). The legacy `<ol type>`
 * numbering attribute is intentionally not exposed — use CSS `list-style-type` via `style`.
 */
export interface ListProps extends ComponentPropsWithoutRef<'ul'> {
  /** List element to render. @default 'ul' */
  as?: ListElement;
  /** Flex direction of the items. @default 'vertical' */
  direction?: ListDirection;
  /** Gap between items, as a spacing token key. @default '2' */
  gap?: ListGap;
  /**
   * Allow items to wrap onto multiple lines (`flex-wrap: wrap`). Only meaningful for
   * `direction="horizontal"` (tag rows, chip groups) — a vertical column has nothing to
   * wrap against. @default false
   */
  wrap?: boolean;
  /**
   * Marker policy. `'none'` (the default — this wrapper targets menus, tag rows, and
   * stacks) removes bullets/numbers and the native indent; `'inherit'` keeps native
   * bullets/numbers and the browser's `padding-inline-start`. @default 'none'
   */
  marker?: ListMarker;
  /** `as="ol"` only: starting number of the ordered list. Ignored on `<ul>`. */
  start?: number;
  /** `as="ol"` only: number the items in descending order. Ignored on `<ul>`. */
  reversed?: boolean;
}
