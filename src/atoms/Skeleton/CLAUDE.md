# Skeleton — contract

Wraps: **`<div>`** (exactly one). Documented reason there is no more-semantic element: a
skeleton is a purely decorative loading placeholder with no HTML equivalent, and it is
removed from the accessibility tree entirely — `aria-hidden="true"` is set after the prop
spread, so it is **always** present and cannot be overridden by consumers.

## UI model (`SkeletonProps` extends `Omit<ComponentPropsWithoutRef<'div'>, 'children'>`)

| Prop     | Values                    | Default                        |
| -------- | ------------------------- | ------------------------------ |
| `shape`  | `text · rect · circle`    | `text`                         |
| `width`  | any CSS width (`string`)  | — (unset)                      |
| `height` | any CSS height (`string`) | — (`text` falls back to `1em`) |

- `text`: height `1em` (tracks surrounding font size) + `--iso-radius-sm`.
- `rect`: `--iso-radius-md`; consumer supplies both dimensions.
- `circle`: `--iso-radius-full` + `aspect-ratio: 1/1`, so one dimension keeps it circular.
- `width`/`height` are applied via inline style because dimensions are content-shaped and
  consumer-supplied. **Prefer token vars**, e.g. `width="var(--iso-size-avatar-md)"`.
  A consumer `style` object is merged last and can override anything.

No children (`children` is omitted at the type level), no other styling props. Ref forwards
to the `<div>`. Dumb and stateless; not
a form control, so nothing to control/uncontrol.

## Tokens consumed

- Shimmer gradient: `--iso-color-neutral-subtle-bg` → `--iso-color-neutral-subtle-bg-hover`
  → back (90deg, oversized `background-size`).
- Motion: `--iso-duration-loop`, `--iso-easing-linear`, infinite.
- Shape radii: `--iso-radius-sm` (text) / `--iso-radius-md` (rect) / `--iso-radius-full`
  (circle).
- Reduced motion: `@media (prefers-reduced-motion: reduce)` removes the animation and
  gradient — static `--iso-color-neutral-subtle-bg`.
- Structural non-token values (animation/geometry, not design decisions): gradient angle
  `90deg`, `background-size: 200% 100%`, keyframe `background-position` percentages,
  `height: 1em` (text), `aspect-ratio: 1/1` (circle).

## Accessibility

Always `aria-hidden="true"` — skeletons never appear in the accessibility tree, receive
no focus, and need no focus ring (nothing focusable; deliberate exception to the
focus-ring rule). **The surrounding region owns the loading semantics**: set
`aria-busy="true"` plus an accessible name (or a live region announcement) on the
container being loaded, and remove it when real content arrives. Shimmer is pure CSS and
freezes under `prefers-reduced-motion: reduce`.

## Stories / tests must cover

All 3 shapes, token-var and percentage dimensions, a text block, circle sizes, and a
composed loading card with an `aria-busy` region; hidden-from-a11y-tree assertion
(`toBeInTheDocument` + `aria-hidden`, including override attempt), each shape renders,
ref forwarding to `HTMLDivElement`, inline width/height applied, consumer `style` merge,
axe on the composed loading card. No interaction callbacks — the element is decorative,
so there is no user-event test by design.
