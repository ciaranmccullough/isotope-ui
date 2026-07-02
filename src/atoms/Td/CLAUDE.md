# Td — contract

Wraps: **`<td>`** (exactly one). Pain points removed: `text-align` is a typed variant instead of
ad-hoc CSS, and `numeric` opts into tabular figures + end alignment so digit columns line up.
Valid nesting is the consumer's responsibility: render inside a `<tr>` (of a `<tbody>`/`<table>`).

## UI model (`TdProps` extends `ComponentPropsWithoutRef<'td'>`)

| Prop      | Values                 | Default |
| --------- | ---------------------- | ------- |
| `align`   | `start · center · end` | `start` |
| `numeric` | `true · false`         | `false` |

`numeric` sets `font-variant-numeric: tabular-nums` and `text-align: end`, and **takes precedence
over `align`** (the `.numeric` class is declared after the `align-*` classes in the cascade).
No other styling props. Content is `children`. Ref forwards to the `<td>`
(`HTMLTableCellElement`).

## Tokens consumed

- Typography: `--iso-color-text`, `--iso-font-family-sans`, `--iso-font-size-md`,
  `--iso-line-height-normal`.
- Spacing: `--iso-spacing-2` (`padding-block`), `--iso-spacing-3` (`padding-inline`).
- Border: `--iso-border-width-1` + `--iso-color-border` (row rule via `border-bottom`).
- `align`/`numeric` variant classes otherwise use only CSS keywords
  (`start/center/end`, `tabular-nums`) — no token values involved.

## Accessibility

Native `<td>` semantics — role `cell` inside a `<table>`, no ARIA added. Not focusable, so no
focus-ring styles; no motion, so no `prefers-reduced-motion` guard. Native `headers`/`colSpan`/
`rowSpan` attributes pass through untouched for complex tables.

## Stories / tests must cover

Stories: playground cell inside a real table, all 3 alignments, a numeric column in context,
`numeric` overriding an explicit `align`. Tests (always inside a real table): role `cell` +
accessible name, every `align` value renders, `numeric` (alone and with `align`) renders, ref
forwards to `HTMLTableCellElement`, `onClick` fires via user-event, axe on a full table.
Not applicable: uncontrolled value reads (not a form control).
