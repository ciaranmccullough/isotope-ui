# Link — contract

Wraps: **`<a>`** (exactly one, in the default branch). Pain points removed: `external` makes
new-tab links safe by default (`target="_blank"` + `rel="noreferrer"` merged with any consumer
`rel`), and `asChild` gives router links (React Router, Next.js…) the same styling without a
nested anchor — the component is router-agnostic.

## UI model (`LinkProps` extends `ComponentPropsWithoutRef<'a'>`)

| Prop        | Values                  | Default |
| ----------- | ----------------------- | ------- |
| `tone`      | `link · inherit`        | `link`  |
| `underline` | `hover · always · none` | `hover` |
| `external`  | `boolean`               | `false` |
| `asChild`   | `boolean`               | `false` |

- `external` — forces `target="_blank"` (overriding any consumer `target` while set) and merges
  `noreferrer` into the consumer `rel`, deduplicated. Security rationale: `rel="noreferrer"`
  implies `noopener`, so the opened page cannot reach `window.opener` (reverse-tabnabbing) and
  the `Referer` header is suppressed.
- `asChild` — router escape hatch. Instead of rendering an `<a>`, `cloneElement`s the **single
  valid React element child**, merging the computed className with the child's own and spreading
  the remaining props (including `external`'s `target`/`rel`) onto it. Throws a clear `Error`
  (validated with `isValidElement`) if the child is not a single valid element.
- **Ref forwards to the `<a>` only in the default branch.** In the `asChild` branch the incoming
  ref is not attached — attach a ref to the child element directly.

No other styling props. Content is `children`.

## Tokens consumed

- Tone `link`: `--iso-color-text-link`, hover `--iso-color-text-link-hover`. Tone `inherit` uses
  the CSS `inherit` keyword (currentColor of the surrounding text) — no token needed.
- Underline variants: `text-decoration-line` keywords only — no tokens needed. `underline="hover"`
  also underlines on `:focus-visible` for keyboard users.
- Focus: `--iso-focus-ring-width/offset`, `--iso-color-focus-ring`; `--iso-radius-sm` on the base
  class rounds the outline (outline follows `border-radius`).
- Motion: `--iso-duration-fast`, `--iso-easing-standard` on color/text-decoration-color (disabled
  under `prefers-reduced-motion`).

## Accessibility

Native anchor semantics — no ARIA added. Focus via `:focus-visible` ring tokens. `external` links
stay safe without consumers remembering `rel`. With `asChild`, semantics come from the child —
the child must itself render a real link (frameworks' `<Link>` components do).

## Stories / tests must cover

All 2×3 tone/underline combinations, inherit-tone-in-context, external, asChild with a
router-like child; href passthrough, external target+rel (incl. rel merge/dedupe), asChild
renders the child with merged className and no nested `<a>`, asChild external passthrough,
asChild throws on invalid child, ref forwarding (default branch), onClick, axe.

## Deviations noted for the integrator

- `tone` values `link | inherit` are outside the shared tone vocabulary
  (`neutral|accent|positive|critical|caution`) — fixed by the component spec; documented here per
  the variant contract's "shared vocabulary" rule.
