# Text — contract

Wraps: **one native text element**, chosen via `as`:
`p` (default) · `span` · `h1`–`h6` · `strong` · `em` · `small` · `label`. Pain point removed: the
semantic level (`as`) is decoupled from the visual scale (`size`) — document outline never
dictates appearance. Margins are zeroed; consumers own spacing.

## UI model (`TextProps` extends `HTMLAttributes<HTMLElement>`)

| Prop       | Values                                                                 | Default   |
| ---------- | ---------------------------------------------------------------------- | --------- |
| `as`       | `p · span · h1 · h2 · h3 · h4 · h5 · h6 · strong · em · small · label` | `p`       |
| `size`     | `xs · sm · md · lg · xl · 2xl · 3xl · 4xl`                             | `md`      |
| `weight`   | `regular · medium · semibold · bold`                                   | `regular` |
| `tone`     | `default · secondary · muted · disabled · inverse`                     | `default` |
| `align`    | `start · center · end` (logical, follows writing direction)            | unset     |
| `truncate` | `boolean` — single-line ellipsis; consumer constrains width            | `false`   |

No other styling props. Content is `children`. Ref forwards to whichever native element `as`
selects (typed `HTMLElement`).

## Tokens consumed

- Size: `--iso-font-size-xs/sm/md/lg/xl/2xl/3xl/4xl`.
- Weight: `--iso-font-weight-regular/medium/semibold/bold`.
- Tone: `--iso-color-text`, `--iso-color-text-secondary`, `--iso-color-text-muted`,
  `--iso-color-text-disabled`, `--iso-color-text-inverse`.
- Type base: `--iso-font-family-sans`, `--iso-line-height-normal`.
- No motion, focus, or spacing tokens — the atom is static, non-focusable, and margin-free
  (`align`/`truncate` use only CSS keywords).

## Accessibility

Semantics come entirely from the element the consumer picks via `as` — choose heading levels for
document structure, not for looks (that's what `size` is for). No ARIA is added. The atom is not
focusable and has no animation, so no focus ring or reduced-motion guard applies. `as="label"`
supports implicit association (nest the control in `children`); `htmlFor` is not exposed because
props are `HTMLAttributes<HTMLElement>` — use a dedicated form-label molecule for explicit
`for`/`id` association. `tone="disabled"` is purely visual; it does not convey a disabled state
to assistive technology. Truncated text remains fully available to screen readers (CSS-only
overflow).

## Stories / tests must cover

All 12 `as` elements, 8 sizes, 4 weights, 5 tones (inverse on a solid surface), 3 alignments,
truncation, and a semantics-vs-scale demo; default renders a `<p>` (role `paragraph`), heading
level + accessible name via role query, per-element rendering through the forwarded ref,
className merge, onClick via user-event, axe.
