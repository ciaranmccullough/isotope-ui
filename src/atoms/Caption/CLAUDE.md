# Caption — contract

Wraps: **`<caption>`** (exactly one). Pain point removed: `caption-side` and `text-align` are
exposed as typed, token-styled variants instead of ad-hoc CSS. The caption is the table's
accessible name — render it as the **first child of a `<table>`** (HTML requirement; `side`
moves it visually, not in the DOM).

## UI model (`CaptionProps` extends `ComponentPropsWithoutRef<'caption'>`)

| Prop    | Values                 | Default |
| ------- | ---------------------- | ------- |
| `align` | `start · center · end` | `start` |
| `side`  | `top · bottom`         | `top`   |

No other styling props. Content is `children`. Ref forwards to the `<caption>`
(`HTMLTableCaptionElement`).

## Tokens consumed

- Typography: `--iso-color-text-secondary`, `--iso-font-size-sm`, `--iso-font-family-sans`,
  `--iso-line-height-normal`.
- Spacing: `--iso-spacing-2` (`padding-block`).
- `align`/`side` variant classes use only CSS keywords (`start/center/end`, `top/bottom`) — no
  token values involved.

## Accessibility

Native `<caption>` semantics — no ARIA added. Screen readers announce it as the table's name
(tests assert `getByRole('table', { name })`). Not focusable, so no focus-ring styles; no
motion, so no `prefers-reduced-motion` guard. Valid nesting is the consumer's responsibility:
`<caption>` must be the first child of `<table>`.

## Stories / tests must cover

Stories: playground caption inside a real table, all 3 alignments, both sides (top/bottom).
Tests: table accessible name from caption, every `align` × `side` combination renders, ref
forwards to `HTMLTableCaptionElement`, `onClick` fires via user-event, axe on a full table.
Not applicable: uncontrolled value reads (not a form control).
