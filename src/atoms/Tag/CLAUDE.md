# Tag — contract

Wraps: **`<span>`**. Documented deviation from "native element at the core": HTML has no element
for a category/metadata label, so the honest core is the generic inline container — the text
itself is the semantics (AT reads it inline; no role is exposed or added).

**Non-interactive by design.** A Tag never receives focus, never handles activation. A removable
filter label is the **Chip molecule**; anything clickable belongs in a `Button` or `Link`
wrapping/adjacent to the Tag. Distinct from Chip visually (square `radius-sm` vs pill) and
behaviorally (no dot, no remove affordance).

## UI model (`TagProps` extends `ComponentPropsWithoutRef<'span'>`)

| Prop   | Values                                             | Default   |
| ------ | -------------------------------------------------- | --------- |
| `tone` | `neutral · accent · positive · critical · caution` | `neutral` |

No other styling props. Content is `children`. Ref forwards to the `<span>`.

## Tokens consumed

- Tone: `--iso-color-<tone>-subtle-bg` + `--iso-color-<tone>-subtle-fg` — the same AA-checked
  pairing the Button's subtle emphasis uses. Tone classes set values directly (no private-prop
  indirection: a single emphasis needs no tone × emphasis matrix).
- Shape/type: `--iso-radius-sm`, `--iso-spacing-1`/`--iso-spacing-2` (padding, gap),
  `--iso-font-family-sans`, `--iso-font-size-xs`, `--iso-font-weight-medium`,
  `--iso-line-height-tight`.
- Not focusable and nothing animates: no focus-ring tokens, no motion tokens, no
  `prefers-reduced-motion` guard.

## Accessibility

No ARIA. The tag is announced as inline text within its context — correct for a label that _is_
its text. Color is never the only signal: the tone tints a label that already says what it means.
Don't put interactive content inside a Tag.

## Stories / tests must cover

Stories: playground, all five tones, an in-context row (tags inline with text). Tests: children
render as text, root stays a `<span>` with no role, every tone renders, ref forwards to
`HTMLSpanElement`, className merge + native span prop spread, axe across all tones.
Not applicable: uncontrolled value reads (not a form control), keyboard/focus (non-interactive).
