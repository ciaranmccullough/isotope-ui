import type { HTMLAttributes } from 'react';

export type TextElement =
  'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong' | 'em' | 'small' | 'label';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextTone = 'default' | 'secondary' | 'muted' | 'disabled' | 'inverse';
export type TextAlign = 'start' | 'center' | 'end';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Semantic element to render — decoupled from the visual `size`. @default 'p' */
  as?: TextElement;
  /** Visual scale, independent of the semantic element. @default 'md' */
  size?: TextSize;
  /** Font weight. @default 'regular' */
  weight?: TextWeight;
  /** Text color intent. @default 'default' */
  tone?: TextTone;
  /** Logical horizontal alignment (follows writing direction). Unset by default. */
  align?: TextAlign;
  /** Single-line ellipsis truncation. @default false */
  truncate?: boolean;
}
