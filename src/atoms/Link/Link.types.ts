import type { ComponentPropsWithoutRef } from 'react';

export type LinkTone = 'link' | 'inherit';
export type LinkUnderline = 'hover' | 'always' | 'none';

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  /**
   * Color intent: `link` uses the semantic link tokens, `inherit` uses the surrounding text
   * color (`currentColor`). @default 'link'
   */
  tone?: LinkTone;
  /** Underline behavior. `hover` also underlines on keyboard focus. @default 'hover' */
  underline?: LinkUnderline;
  /**
   * Opens the link in a new tab: forces `target="_blank"` and merges `noreferrer` into any
   * consumer-provided `rel` (deduplicated). Security rationale: `rel="noreferrer"` implies
   * `noopener`, so the opened page cannot reach `window.opener` (reverse-tabnabbing) and the
   * `Referer` header is suppressed. @default false
   */
  external?: boolean;
  /**
   * Router escape hatch: instead of rendering an `<a>`, clones the single valid React element
   * child (e.g. a framework `<Link>`), merging the computed className with the child's own and
   * spreading the remaining props onto it. Throws a clear `Error` if the child is not a single
   * valid element. The forwarded ref attaches to the `<a>` only in the default branch — in the
   * `asChild` branch attach a ref to the child directly. @default false
   */
  asChild?: boolean;
}
