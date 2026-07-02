# Table — contract

Wraps: **`<table>`**, composed from Caption, Thead/Tbody (TableSection), Tr, Th, Td.
Data-structure-agnostic with two modes:

1. **Config mode** — `columns: TableColumn<Row>[]` + `rows: Row[]` (+ optional `rowKey`,
   `render` per column; without `render` the cell reads `row[key]`).
2. **Composition mode** — `children` built from the table atoms/molecules directly.
   **Children win** when both are given.

| Prop      | Values                                                | Default |
| --------- | ----------------------------------------------------- | ------- |
| `caption` | ReactNode → `<caption>` (the table's accessible name) | —       |
| `striped` | boolean (zebra on tbody rows)                         | `false` |

Dumb: no sorting, selection, or pagination state — consumers re-render with new data. Ref
forwards to the `<table>`; generic `Row` typing survives via the documented forwardRef cast.

## Tokens consumed

`--iso-color-surface` (bg), `--iso-color-surface-sunken` (stripes), `--iso-color-text`,
`--iso-font-family-sans`. Cell/section typography and borders come from the composed
Th/Td/Thead/Tfoot contracts. `border-collapse: collapse` is required for their border rules —
set here, documented in TableSection's CLAUDE.md.

## Accessibility

Real table semantics; `caption` is the accessible name — stories/tests always pass one. Column
headers get `scope="col"` from the Th default.

## Stories / tests must cover

Config mode (roles: table-by-caption-name, columnheaders, cells incl. rendered + record-read
values), rowKey, children-win precedence, striped, ref, axe. Integration:
tests/integration/table.integration.test.tsx assembles from data end-to-end.
