# Icon — contract

Wraps: **`<svg>`** (exactly one). Pain points removed: decorative by default (`aria-hidden="true"`
and `focusable="false"`, so it is silent to assistive technology and never a legacy-IE tab stop),
`viewBox` defaults to `"0 0 24 24"`, and the root class sets `fill: currentColor` so glyphs
inherit the surrounding text color with zero configuration.

## UI model (`IconProps` extends `ComponentPropsWithoutRef<'svg'>`)

| Prop    | Values                   | Default        |
| ------- | ------------------------ | -------------- |
| `size`  | `xs · sm · md · lg · xl` | `md`           |
| `label` | any string               | — (decorative) |

Children are the SVG contents (`<path>`, `<circle>`, …) drawn against the `viewBox`. No other
styling props. Ref forwards to the `<svg>`.

Color: fill-based glyphs inherit the text color of the nearest ancestor via `fill: currentColor`
on the root class. Stroke-based children must set `stroke="currentColor" fill="none"` on
themselves — the component never restyles its children.

## Tokens consumed

- Size: `--iso-size-icon-xs/sm/md/lg/xl` — each size class sets width **and** height.
- Nothing else: color is inherited (`currentColor`); no borders, no motion (hence no
  `prefers-reduced-motion` guard needed).

## Accessibility

- Default: `aria-hidden="true"` with `focusable="false"` — decorative. Adjacent text carries the
  meaning. An empty-string `label` is treated as decorative.
- `label="…"` escape hatch: renders `role="img"` with `aria-label` **instead of** `aria-hidden`,
  for icons that are the content (e.g. a status glyph with no visible text).
- The svg is never a tab stop; an interactive icon belongs inside a `Button`, not on its own.

## Stories / tests must cover

All 5 sizes, decorative vs labelled, color inheritance via colored wrapper spans (including a
stroke-based child); default and overridden `viewBox`, aria-hidden/focusable defaults,
`role="img"` with accessible name when labelled, ref forwarding, onClick, axe.
