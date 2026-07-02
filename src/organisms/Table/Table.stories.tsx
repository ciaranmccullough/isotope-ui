import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import type { TableColumn } from './Table.types';
import { Td } from '../../atoms/Td';
import { Th } from '../../atoms/Th';
import { Tr } from '../../atoms/Tr';
import { Tbody, Tfoot, Thead } from '../../molecules/TableSection';

interface Isotope {
  name: string;
  symbol: string;
  abundance: string;
  halfLife: string;
}

const columns: TableColumn<Isotope>[] = [
  { key: 'name', header: 'Isotope' },
  { key: 'symbol', header: 'Symbol', align: 'center' },
  { key: 'abundance', header: 'Abundance', numeric: true },
  { key: 'halfLife', header: 'Half-life', numeric: true },
];

const rows: Isotope[] = [
  { name: 'Hydrogen-1', symbol: '¹H', abundance: '99.98%', halfLife: 'stable' },
  { name: 'Carbon-14', symbol: '¹⁴C', abundance: 'trace', halfLife: '5,730 y' },
  { name: 'Uranium-238', symbol: '²³⁸U', abundance: '99.27%', halfLife: '4.47 by' },
  { name: 'Technetium-99', symbol: '⁹⁹Tc', abundance: 'synthetic', halfLife: '211,000 y' },
];

const meta: Meta = {
  title: 'Organisms/Table',
};

export default meta;

export const FromData: StoryObj = {
  render: () => (
    <Table caption="Common isotopes" columns={columns} rows={rows} rowKey={(r) => r.symbol} />
  ),
};

export const Striped: StoryObj = {
  render: () => <Table caption="Common isotopes" columns={columns} rows={rows} striped />,
};

export const Composed: StoryObj = {
  name: 'Composed from children',
  render: () => (
    <Table caption="Hand-composed">
      <Thead>
        <Tr>
          <Th scope="col">Section</Th>
          <Th scope="col" numeric>
            Components
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Atoms</Td>
          <Td numeric>18</Td>
        </Tr>
        <Tr>
          <Td>Molecules</Td>
          <Td numeric>6</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Td>Total</Td>
          <Td numeric>24</Td>
        </Tr>
      </Tfoot>
    </Table>
  ),
};
