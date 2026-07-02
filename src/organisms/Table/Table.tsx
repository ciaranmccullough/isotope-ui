import { forwardRef } from 'react';
import type { ForwardedRef, ReactElement, ReactNode, Ref } from 'react';
import { Caption } from '../../atoms/Caption';
import { Th } from '../../atoms/Th';
import { Td } from '../../atoms/Td';
import { Tr } from '../../atoms/Tr';
import { Thead, Tbody } from '../../molecules/TableSection';
import type { TableColumn, TableProps } from './Table.types';
import styles from './Table.module.css';

function defaultCell<Row>(row: Row, column: TableColumn<Row>): ReactNode {
  const value = (row as Record<string, unknown>)[column.key];
  return value as ReactNode;
}

/**
 * Complete accessible `<table>` composed from the table atoms/molecules. Data-structure-
 * agnostic: pass `columns` + `rows` for config mode, or compose `children` yourself
 * (children win when both are given — documented). Dumb: no sorting/selection state; the
 * consumer re-renders with different data instead.
 */
function TableInner<Row>(
  {
    caption,
    columns,
    rows,
    rowKey,
    striped = false,
    className,
    children,
    ...rest
  }: TableProps<Row>,
  ref: ForwardedRef<HTMLTableElement>,
) {
  const classes = [styles.table, striped && styles.striped, className].filter(Boolean).join(' ');

  return (
    <table ref={ref} className={classes} {...rest}>
      {caption !== undefined && <Caption>{caption}</Caption>}
      {children ?? (
        <>
          <Thead>
            <Tr>
              {(columns ?? []).map((column) => (
                <Th key={column.key} align={column.align} numeric={column.numeric} scope="col">
                  {column.header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {(rows ?? []).map((row, rowIndex) => (
              <Tr key={rowKey ? rowKey(row, rowIndex) : rowIndex}>
                {(columns ?? []).map((column) => (
                  <Td key={column.key} align={column.align} numeric={column.numeric}>
                    {column.render ? column.render(row, rowIndex) : defaultCell(row, column)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </>
      )}
    </table>
  );
}

// Generic components can't flow through forwardRef without erasing the row type — the cast
// restores it (standard generic-forwardRef pattern).
export const Table = forwardRef(TableInner) as <Row = unknown>(
  props: TableProps<Row> & { ref?: Ref<HTMLTableElement> },
) => ReactElement;
