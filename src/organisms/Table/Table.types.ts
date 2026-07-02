import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface TableColumn<Row> {
  /** Unique column id; also the row property read when no `render` is given. */
  key: string;
  header: ReactNode;
  align?: 'start' | 'center' | 'end';
  /** Tabular figures + end alignment (mirrors Th/Td `numeric`). */
  numeric?: boolean;
  /** Cell renderer; defaults to reading `row[key]` on record-shaped rows. */
  render?: (row: Row, rowIndex: number) => ReactNode;
}

export interface TableProps<Row = unknown> extends ComponentPropsWithoutRef<'table'> {
  /** Rendered as the table's `<caption>` (its accessible name). */
  caption?: ReactNode;
  /** Config mode: column definitions. Ignored when `children` are given. */
  columns?: readonly TableColumn<Row>[];
  /** Config mode: row data. Ignored when `children` are given. */
  rows?: readonly Row[];
  /** Stable row key; defaults to the row index. */
  rowKey?: (row: Row, index: number) => string | number;
  /** Zebra striping on body rows. @default false */
  striped?: boolean;
}
