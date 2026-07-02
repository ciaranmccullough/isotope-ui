import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Table } from '../../src/organisms/Table';
import type { TableColumn } from '../../src/organisms/Table';

/**
 * Table-from-data: the organism must assemble caption, header, and body from plain data with
 * full native table semantics — the composition of Caption/Thead/Tbody/Tr/Th/Td is the risk.
 */
interface Element {
  name: string;
  symbol: string;
  protons: number;
}

const columns: TableColumn<Element>[] = [
  { key: 'name', header: 'Element' },
  { key: 'symbol', header: 'Symbol', align: 'center' },
  { key: 'protons', header: 'Protons', numeric: true },
];

const rows: Element[] = [
  { name: 'Hydrogen', symbol: 'H', protons: 1 },
  { name: 'Helium', symbol: 'He', protons: 2 },
  { name: 'Lithium', symbol: 'Li', protons: 3 },
];

describe('Table integration', () => {
  it('assembles a fully accessible table from data', () => {
    render(
      <Table
        caption="Periodic table (first three)"
        columns={columns}
        rows={rows}
        rowKey={(row) => row.symbol}
        striped
      />,
    );

    const table = screen.getByRole('table', { name: 'Periodic table (first three)' });
    const headers = within(table).getAllByRole('columnheader');
    expect(headers.map((h) => h.textContent)).toEqual(['Element', 'Symbol', 'Protons']);

    // 1 header row + 3 data rows, all real <tr> semantics
    expect(within(table).getAllByRole('row')).toHaveLength(4);

    // Row-by-row content, in data order
    const bodyRows = within(table).getAllByRole('row').slice(1);
    expect(
      within(bodyRows[0]!)
        .getAllByRole('cell')
        .map((c) => c.textContent),
    ).toEqual(['Hydrogen', 'H', '1']);
    expect(within(bodyRows[2]!).getByRole('cell', { name: 'Lithium' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Table caption="Periodic table" columns={columns} rows={rows} striped />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
