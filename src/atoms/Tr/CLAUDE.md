# Tr — contract

Wraps: **`<tr>`** (exactly one). Pain points removed: hover affordance for clickable rows
(`interactive`) and selection styling (`selected`) are typed, token-mapped props instead of
ad-hoc CSS, and `selected` wires up the `aria-selected` state where the table pattern supports
it.

## UI model (`TrProps` extends `ComponentPropsWithoutRef<'tr'>`)

| Prop          | Values    | Default              |
| ------------- | --------- | -------------------- |
| `interactive` | `boolean` | `false`              |
| `selected`    | `boolean` | unset (no attribute) |

No other styling props. Content is `children` (`<td>`/`<th>` cells). Ref forwards to the `<tr>`
(`HTMLTableRowElement`).

`selected` is deliberately opt-in and tri-state: when the prop is omitted, **no** `aria-selected`
attribute is rendered. `aria-selected` on a row is only valid where the table pattern allows
selection (e.g. `role="grid"` / `treegrid`); plain data tables must not carry it — stripe or
highlight rows via CSS only (see the Zebra story) and leave `selected` unset.

## Tokens consumed

- Interactive: `--iso-color-surface-sunken` (hover bg), `--iso-duration-fast` +
  `--iso-easing-standard` (background transition, disabled under `prefers-reduced-motion`).
- Selected: `--iso-color-accent-subtle-bg`; interactive + selected hover:
  `--iso-color-accent-subtle-bg-hover`.
- Focus: `--iso-focus-ring-width/offset`, `--iso-color-focus-ring` (`:focus-visible`; engages
  only when the consumer makes the row focusable, e.g. roving `tabIndex` in a grid).

## Accessibility

Native row semantics — implicit `role="row"`, no ARIA added except the opt-in `aria-selected`
via `selected`. `interactive` is visual affordance only: it adds no click or key handlers — pass
`onClick` and keyboard wiring per your composition's pattern. Not focusable by default; the
focus ring applies only if the consumer adds `tabIndex`. Valid nesting is the consumer's
responsibility: `<tr>` belongs inside `<thead>/<tbody>/<tfoot>` of a `<table>`.

## Stories / tests must cover

Stories: playground row inside a real table, interactive hover rows, selected (incl.
interactive + selected inside a `role="grid"` table), zebra striping via CSS-only backgrounds
composing Tr + native cells. Tests (all inside a real `<table>` + `<tbody>`): role `row` with
accessible name from cell content, `selected` sets `aria-selected` true/false and no attribute
when unset, `interactive` renders, ref forwards to `HTMLTableRowElement`, `onClick` fires via
user-event, axe on both a plain table and a `role="grid"` table. Not applicable: uncontrolled
value reads (not a form control).
