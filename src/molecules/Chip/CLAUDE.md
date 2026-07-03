# Chip — contract

A pill-shaped status/filter label. Composes **a `<span>` root + optional decorative dot +
optional remove `Button`** (the Toast dismiss pattern). The removable form is why Chip is a
molecule: a second interactive element disqualifies it from the atoms tier. For a plain
non-interactive label use the **Tag atom** (square, no dot, no remove); anything the user
_selects_ is a form control, not a Chip.

## UI model (`ChipProps` extends `ComponentPropsWithoutRef<'span'>`)

| Prop          | Values                                             | Default   |
| ------------- | -------------------------------------------------- | --------- |
| `tone`        | `neutral · accent · positive · critical · caution` | `neutral` |
| `dot`         | `boolean` — decorative leading status dot          | `false`   |
| `onRemove`    | `() => void` — presence renders the remove button  | —         |
| `removeLabel` | string (accessible name of the remove button)      | `Remove`  |

No other styling props. Content is `children`. Ref forwards to the root `<span>` — the remove
button is conditional, so the root is the stable target (Toast rationale).

## Behavior (stateless by design)

- `onRemove` only reports intent; the chip removes nothing itself. The consumer owns the list
  the chip renders from (the ConsumerFilters story is the reference).
- The dot is pure decoration (`aria-hidden`): `background: currentColor` inherits the tone
  foreground, and the chip text — not the color — carries the meaning.
- The remove button is a tone-matched ghost `sm` `Button` with a plain `×` glyph, compacted in
  Chip's CSS (see below); its focus ring, transition and reduced-motion guard come from Button.

## Tokens consumed

- Tone sets (via private `--_*` props): `--iso-color-<tone>-subtle-bg` (background),
  `--iso-color-<tone>-subtle-fg` (foreground), `--iso-color-<tone>-subtle-bg-hover` (remove
  hover — the ghost Button's own hover bg equals the chip bg and would vanish on this tinted
  surface, so it steps one level; Toast precedent).
- Shape/type: `--iso-radius-full` (pill + dot + round button), `--iso-spacing-1/2/3`
  (padding, gap, dot size, tuck margins via `calc(-1 * …)`), `--iso-font-family-sans`,
  `--iso-font-size-xs`, `--iso-font-weight-medium`, `--iso-line-height-tight`,
  `--iso-font-size-md` (× glyph).
- Remove button compaction: `--iso-size-icon-lg` block-size — 24px keeps the WCAG 2.5.8
  minimum pointer target; negative block/inline-end margins tuck it into the pill padding so
  chip height stays text-driven. Two-class specificity (`.chip .remove`) beats Button's size
  and emphasis classes deterministically.
- Root is static: no motion tokens, no reduced-motion guard needed (the Button brings its own).

## Accessibility

The root is plain inline content — no role; AT reads the label text. The remove button is named
by `removeLabel`: **pass a chip-specific name** (e.g. `Remove React`) because several chips
usually sit side by side and bare "Remove" is ambiguous; the default stays generic for the
single-chip case. The dot is `aria-hidden` and never the only signal. Keyboard: the button is
the only tab stop; Space/Enter activate it natively.

## Stories / tests must cover

Stories: playground, all five tones, dot ramp, removable, a consumer-state filter bar (chips
disappear via consumer `useState`, not chip state). Tests: label renders, every tone renders,
dot renders only when asked + stays decorative, no button without `onRemove`, `onRemove` fires
once on click and removes nothing itself, default + custom `removeLabel`, ref forwards to
`HTMLSpanElement`, className merge + native span prop spread, axe across all tones fully loaded.
