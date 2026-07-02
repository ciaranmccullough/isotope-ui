import { cloneElement, forwardRef, isValidElement } from 'react';
import type { LinkProps } from './Link.types';
import styles from './Link.module.css';

/**
 * Native `<a>` with token-mapped variants. Pain points removed: `external` makes new-tab links
 * safe by default (`target="_blank"` + `rel="noreferrer"`, merged with any consumer `rel` —
 * `noreferrer` implies `noopener`, so the opened page cannot reach `window.opener` for
 * reverse-tabnabbing and the `Referer` header is suppressed), and `asChild` lets router links
 * (e.g. a framework `<Link>`) reuse the styling without a nested anchor.
 *
 * The forwarded ref attaches to the `<a>` only in the default branch; with `asChild` the child
 * element is cloned and the incoming ref is not attached — put a ref on the child directly.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    tone = 'link',
    underline = 'hover',
    external = false,
    asChild = false,
    className,
    target,
    rel,
    children,
    ...rest
  },
  ref,
) {
  const classes = [styles.link, styles[`tone-${tone}`], styles[`underline-${underline}`], className]
    .filter(Boolean)
    .join(' ');

  const mergedTarget = external ? '_blank' : target;
  const mergedRel = external
    ? [...new Set([...(rel ? rel.split(/\s+/).filter(Boolean) : []), 'noreferrer'])].join(' ')
    : rel;

  if (asChild) {
    if (!isValidElement<Record<string, unknown>>(children)) {
      throw new Error(
        'Link: `asChild` requires a single valid React element child to clone (e.g. a framework <Link>). Received an invalid child.',
      );
    }
    const childClassName =
      typeof children.props.className === 'string' ? children.props.className : undefined;
    return cloneElement(children, {
      ...rest,
      ...(mergedTarget !== undefined ? { target: mergedTarget } : null),
      ...(mergedRel !== undefined ? { rel: mergedRel } : null),
      className: [classes, childClassName].filter(Boolean).join(' '),
    });
  }

  return (
    <a ref={ref} className={classes} target={mergedTarget} rel={mergedRel} {...rest}>
      {children}
    </a>
  );
});
