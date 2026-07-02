import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Th } from './Th';
import type { ThAlign, ThScope } from './Th.types';

const aligns: ThAlign[] = ['start', 'center', 'end'];
const scopes: ThScope[] = ['col', 'row', 'colgroup', 'rowgroup'];

const tableStyle: CSSProperties = {
  borderCollapse: 'collapse',
  minWidth: 'var(--iso-size-container-sm)',
};

const cellStyle: CSSProperties = {
  padding: 'var(--iso-spacing-2) var(--iso-spacing-3)',
  borderBottom: 'var(--iso-border-width-1) solid var(--iso-color-border)',
  color: 'var(--iso-color-text)',
  fontFamily: 'var(--iso-font-family-sans)',
  fontSize: 'var(--iso-font-size-sm)',
};

const numericCellStyle: CSSProperties = {
  ...cellStyle,
  textAlign: 'end',
  fontVariantNumeric: 'tabular-nums',
};

const meta = {
  title: 'Atoms/Th',
  component: Th,
  args: {
    children: 'Header',
    scope: 'col',
    align: 'start',
    numeric: false,
  },
  argTypes: {
    scope: { control: 'select', options: scopes },
    align: { control: 'select', options: aligns },
  },
} satisfies Meta<typeof Th>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <table style={tableStyle}>
      <thead>
        <tr>
          <Th {...args} />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={cellStyle}>Data cell</td>
        </tr>
      </tbody>
    </table>
  ),
};

export const Alignments: Story = {
  render: () => (
    <table style={tableStyle}>
      <thead>
        <tr>
          {aligns.map((align) => (
            <Th key={align} align={align}>
              {align}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={cellStyle}>Aluminium</td>
          <td style={{ ...cellStyle, textAlign: 'center' }}>Al</td>
          <td style={{ ...cellStyle, textAlign: 'end' }}>13</td>
        </tr>
      </tbody>
    </table>
  ),
};

export const Numeric: Story = {
  render: () => (
    <table style={tableStyle}>
      <thead>
        <tr>
          <Th>Isotope</Th>
          <Th numeric>Mass number</Th>
          {/* numeric wins over align — this header is still end-aligned */}
          <Th numeric align="start">
            Abundance %
          </Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={cellStyle}>Carbon-12</td>
          <td style={numericCellStyle}>12</td>
          <td style={numericCellStyle}>98.94</td>
        </tr>
        <tr>
          <td style={cellStyle}>Carbon-13</td>
          <td style={numericCellStyle}>13</td>
          <td style={numericCellStyle}>1.06</td>
        </tr>
      </tbody>
    </table>
  ),
};

export const RowHeaders: Story = {
  render: () => (
    <table style={tableStyle}>
      <thead>
        <tr>
          <Th>Region</Th>
          <Th numeric>Q1</Th>
          <Th numeric>Q2</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Th scope="row">EMEA</Th>
          <td style={numericCellStyle}>1,204</td>
          <td style={numericCellStyle}>1,310</td>
        </tr>
        <tr>
          <Th scope="row">APAC</Th>
          <td style={numericCellStyle}>987</td>
          <td style={numericCellStyle}>1,045</td>
        </tr>
      </tbody>
    </table>
  ),
};

export const GroupScopes: Story = {
  render: () => (
    <table style={tableStyle}>
      <thead>
        <tr>
          <Th scope="colgroup" colSpan={2} align="center">
            H1 2026
          </Th>
          <Th scope="colgroup" colSpan={2} align="center">
            H2 2026
          </Th>
        </tr>
        <tr>
          <Th numeric>Q1</Th>
          <Th numeric>Q2</Th>
          <Th numeric>Q3</Th>
          <Th numeric>Q4</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Th scope="rowgroup" colSpan={4}>
            Revenue
          </Th>
        </tr>
        <tr>
          <td style={numericCellStyle}>1,204</td>
          <td style={numericCellStyle}>1,310</td>
          <td style={numericCellStyle}>1,275</td>
          <td style={numericCellStyle}>1,402</td>
        </tr>
      </tbody>
    </table>
  ),
};
