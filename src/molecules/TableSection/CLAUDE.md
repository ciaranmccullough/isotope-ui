# TableSection — contract

Wraps: **`<thead>` / `<tbody>` / `<tfoot>`** — three components (`Thead`, `Tbody`, `Tfoot`), one
bare native table section element each. Pain point removed: section-level table styling (header
background, footer summary treatment) is token-mapped instead of ad-hoc CSS on raw elements.

## Why one folder holds three components

The three row-group sections are **one semantic unit** of the native table model: they are only
meaningful together inside a `<table>`, share a single stylesheet and contract, and evolve in
lockstep (the Table organism composes all three). Splitting them would triple the file-set
boilerplate without creating any independent contract. Each component still renders exactly one
bare native element and composes nothing — rows and cells (the Tr/Th/Td atoms) are supplied by
the consumer as children.

## UI model (each `…Props` = `ComponentPropsWithoutRef` of its element — no variants)

| Component | Element   | Visual opinion                                                                                   |
| --------- | --------- | ------------------------------------------------------------------------------------------------ |
| `Thead`   | `<thead>` | background `--iso-color-surface-sunken` (its `Th` cells already style themselves)                |
| `Tbody`   | `<tbody>` | none — zebra striping and row treatments belong to the Table organism                            |
| `Tfoot`   | `<tfoot>` | background `--iso-color-surface-sunken`, `--iso-font-weight-medium`, strong top rule (see below) |

These are semantic wrappers: no variants, no other styling props. Content is `children` (rows).
Each ref forwards to its native section element (`HTMLTableSectionElement`) — there is no
interactive element in a row group, so the section itself is the ref target.

## Tokens consumed

- `Thead`: `--iso-color-surface-sunken`.
- `Tbody`: none.
- `Tfoot`: `--iso-color-surface-sunken`, `--iso-font-weight-medium`, `--iso-border-width-1` +
  `--iso-color-border-strong` (top rule). The rule renders only under
  `border-collapse: collapse` — row-group borders are invisible in separated-borders mode, so
  the composing table (organism or story) must set it.
- No motion tokens (no animation → no `prefers-reduced-motion` guard needed) and no focus-ring
  tokens (table sections are not focusable).

## Accessibility

Native row-group semantics ×3 — implicit `role="rowgroup"`, no ARIA added. Children keep their
own roles (`row`, `columnheader`, `rowheader`, `cell`) untouched. Valid nesting is the
consumer's responsibility: render inside a real `<table>`, with `<tr>` rows (the Tr atom) as
direct children, and place `Thead` / `Tbody` / `Tfoot` in that source order.

## Stories / tests must cover

Stories: one composed table showing all three sections (with `border-collapse: collapse` so the
Tfoot rule is visible). Tests (inside a real `<table>` with the Tr/Th/Td atoms): three
`rowgroup` roles, children keep their columnheader/rowheader/cell roles and accessible names,
consumer `className` merge on each section, native prop passthrough (bubbled `onClick` via
user-event), ref forwarding ×3 to `HTMLTableSectionElement`, axe on the full composed table.
Not applicable: uncontrolled value reads (not a form control), variant matrices (no variants).
