import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tbody, Tfoot, Thead } from './TableSection';

const meta = {
  title: 'Molecules/TableSection',
  component: Thead,
} satisfies Meta<typeof Thead>;

export default meta;
type Story = StoryObj<typeof meta>;

// The sections render bare native row groups; rows and cells come from the consumer (here:
// native elements — in an app, the Tr/Th/Td atoms). `border-collapse: collapse` makes the
// Tfoot top rule visible (row-group borders do not render in separated-borders mode).
const cellStyle: CSSProperties = {
  padding: 'var(--iso-spacing-2) var(--iso-spacing-3)',
  textAlign: 'start',
};

export const ComposedTable: Story = {
  render: () => (
    <table style={{ borderCollapse: 'collapse' }}>
      <caption style={{ padding: 'var(--iso-spacing-2)' }}>Quarterly revenue by region</caption>
      <Thead>
        <tr>
          <th scope="col" style={cellStyle}>
            Region
          </th>
          <th scope="col" style={cellStyle}>
            Q1
          </th>
          <th scope="col" style={cellStyle}>
            Q2
          </th>
        </tr>
      </Thead>
      <Tbody>
        <tr>
          <th scope="row" style={cellStyle}>
            EMEA
          </th>
          <td style={cellStyle}>1,200</td>
          <td style={cellStyle}>1,380</td>
        </tr>
        <tr>
          <th scope="row" style={cellStyle}>
            APAC
          </th>
          <td style={cellStyle}>980</td>
          <td style={cellStyle}>1,050</td>
        </tr>
        <tr>
          <th scope="row" style={cellStyle}>
            AMER
          </th>
          <td style={cellStyle}>1,640</td>
          <td style={cellStyle}>1,720</td>
        </tr>
      </Tbody>
      <Tfoot>
        <tr>
          <th scope="row" style={cellStyle}>
            Total
          </th>
          <td style={cellStyle}>3,820</td>
          <td style={cellStyle}>4,150</td>
        </tr>
      </Tfoot>
    </table>
  ),
};
