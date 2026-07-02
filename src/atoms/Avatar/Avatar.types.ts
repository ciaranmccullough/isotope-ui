import type { ComponentPropsWithoutRef } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Image branch: `src` is set, so `alt` is required and a native `<img>` renders.
 * Remaining native `<img>` props (including `onError`) spread through.
 */
export interface AvatarImageProps extends Omit<
  ComponentPropsWithoutRef<'img'>,
  'src' | 'alt' | 'children'
> {
  /** Image URL. Presence of `src` selects the `<img>` branch. */
  src: string;
  /** Alternative text — required whenever `src` is set. */
  alt: string;
  /** Person's name. Ignored by the `<img>` branch; kept so callers can pass it unconditionally. */
  name?: string;
  /** Avatar scale, mapped to `--iso-size-avatar-*`. @default 'md' */
  size?: AvatarSize;
}

/**
 * Fallback branch: no `src` — renders a `<span role="img">` showing initials computed from
 * `name` (first letter of the first and last words, uppercased), labelled with `name`.
 */
export interface AvatarFallbackProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
  /** Absent in the fallback branch (discriminant). */
  src?: undefined;
  /** Absent in the fallback branch — `alt` belongs to the `<img>` branch only. */
  alt?: undefined;
  /** Person's name: source of the initials and the fallback's `aria-label`. */
  name?: string;
  /** Avatar scale, mapped to `--iso-size-avatar-*`. @default 'md' */
  size?: AvatarSize;
}

export type AvatarProps = AvatarImageProps | AvatarFallbackProps;
