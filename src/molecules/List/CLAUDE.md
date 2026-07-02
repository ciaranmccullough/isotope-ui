# List — contract

Wraps: **`<ul>` or `<ol>`** (exactly one, chosen by `as`). A flex-token list box for menus, tag
rows, and stacks. Pain points removed: the browser's default list margin/indent/markers for
app-UI lists (`marker="none"` is the default), and the Safari/VoiceOver quirk where
`list-style: none` drops list semantics (explicit `role="list"` is applied in that case only).

**Composition:** children are consumer-provided `ListItem` atoms or native `<li>` elements. List
styles the list box only — it never imports, clones, or inspects its items (item-level styling
belongs to ListItem, per its contract).

## UI model (`ListProps` extends `ComponentPropsWithoutRef<'ul'>`)

| Prop        | Values                         | Default    |
| ----------- | ------------------------------ | ---------- |
| `as`        | `ul · ol`                      | `ul`       |
| `direction` | `vertical · horizontal`        | `vertical` |
| `gap`       | `0 · 1 · 2 · 3 · 4 · 6 · 8`    | `2`        |
| `wrap`      | `boolean` (`flex-wrap: wrap`)  | `false`    |
| `marker`    | `none · inherit`               | `none`     |
| `start`     | number — **`as="ol"` only**    | —          |
| `reversed`  | `boolean` — **`as="ol"` only** | —          |

- `gap` is a typed subset of `SpacingToken`; each value maps 1:1 to `--iso-spacing-<value>`.
- `wrap` is only meaningful with `direction="horizontal"` (tag rows, chip groups) — a vertical
  column has nothing to wrap against. The class still applies if set; it just has no effect.
- `marker="inherit"` restores native bullets/numbers and the browser's `padding-inline-start`.
- **Documented typing limitation:** props are typed as `ComponentPropsWithoutRef<'ul'>`, not a
  `'ul'`/`'ol'` union. The useful `'ol'`-only attributes `start`/`reversed` are re-exposed as
  explicit props and rendered only when `as="ol"` (silently dropped on `<ul>` so invalid
  attributes never reach the DOM). The legacy `<ol type>` numbering attribute is not exposed —
  use CSS `list-style-type` via `style` if ever needed.
- No other styling props; the consumer `style` prop passes through untouched and always wins.
  Content is `children`. Ref forwards to the rendered `<ul>`/`<ol>`
  (`HTMLUListElement | HTMLOListElement`).

## Tokens consumed

- Layout: `--iso-spacing-0` (margin reset; padding reset under `marker-none`).
- Gap: `--iso-spacing-0/1/2/3/4/6/8` (one class per `gap` value).
- Nothing else — no color, typography, radius, or shadow of its own; those belong to the items.
  No transitions/animations, so no motion tokens and no `prefers-reduced-motion` guard needed.
  Not focusable, so no focus-ring tokens.

## Accessibility

Native `list` role from `<ul>`/`<ol>`. The single ARIA addition fills a platform gap: when
`marker="none"`, Safari/VoiceOver stop announcing the element as a list, so List sets
`role="list"` explicitly (only in that case; an explicit consumer `role` still wins). With
`marker="inherit"`, no ARIA is added. Children must be `<li>`/ListItem for valid list nesting —
stories and tests always render them.

## Stories / tests must cover

Both elements (`ul`/`ol`), both directions, all 7 gaps, `wrap`, both markers, `start`/`reversed`
on `ol` (and their omission on `ul`), the restored `role="list"` under `marker="none"` vs no
ARIA under `marker="inherit"`, ListItem composition, className merge, ref instance for both
elements, axe for `ul` and `ol` in both marker modes.
