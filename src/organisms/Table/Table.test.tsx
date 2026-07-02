import { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Table } from './Table';
import { Td } from '../../atoms/Td';
import { Tr } from '../../atoms/Tr';
import { Tbody } from '../../molecules/TableSection';
import type { TableColumn } from './Table.types';

interface Isotope {
  name: string;
  symbol: string;
  halfLife: number;
}

const columns: TableColumn<Isotope>[] = [
  { key: 'name', header: 'Isotope' },
  { key: 'symbol', header: 'Symbol' },
  {
    key: 'halfLife',
    header: 'Half-life (y)',
    numeric: true,
    render: (row) => row.halfLife.toLocaleString('en-US'),
  },
];

const rows: Isotope[] = [
  { name: 'Carbon-14', symbol: '¹⁴C', halfLife: 5730 },
  { name: 'Uranium-238', symbol: '²³⁸U', halfLife: 4_468_000_000 },
];

describe('Table', () => {
  it('assembles an accessible table from columns and rows, named by its caption', () => {
    render(<Table caption="Common isotopes" columns={columns} rows={rows} />);
    const table = screen.getByRole('table', { name: 'Common isotopes' });
    expect(within(table).getAllByRole('columnheader')).toHaveLength(3);
    expect(within(table).getAllByRole('row')).toHaveLength(3);
    expect(within(table).getByRole('cell', { name: 'Carbon-14' })).toBeInTheDocument();
    expect(within(table).getByRole('cell', { name: '4,468,000,000' })).toBeInTheDocument();
  });

  it('reads plain record values when a column has no render function', () => {
    render(<Table caption="Data" columns={columns} rows={rows} />);
    expect(screen.getByRole('cell', { name: '²³⁸U' })).toBeInTheDocument();
  });

  it('uses rowKey for row identity without changing the rendered output', () => {
    render(<Table caption="Keyed" columns={columns} rows={rows} rowKey={(row) => row.symbol} />);
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  it('lets children win over config mode', () => {
    render(
      <Table caption="Composed" columns={columns} rows={rows}>
        <Tbody>
          <Tr>
            <Td>hand-built</Td>
          </Tr>
        </Tbody>
      </Table>,
    );
    expect(screen.getByRole('cell', { name: 'hand-built' })).toBeInTheDocument();
    expect(screen.queryByRole('columnheader')).not.toBeInTheDocument();
  });

  it('renders striped mode', () => {
    render(<Table caption="Striped" columns={columns} rows={rows} striped />);
    expect(screen.getByRole('table', { name: 'Striped' })).toBeInTheDocument();
  });

  it('forwards its ref to the native table element', () => {
    const ref = createRef<HTMLTableElement>();
    render(<Table caption="Ref" columns={columns} rows={rows} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Table caption="Common isotopes" columns={columns} rows={rows} striped />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
