import type { Meta, StoryObj } from '@storybook/react-vite';
import { Td } from './Td';
import type { TdAlign } from './Td.types';

const aligns: TdAlign[] = ['start', 'center', 'end'];

const tableStyle = { width: 'var(--iso-size-container-sm)', borderCollapse: 'collapse' as const };

const meta = {
  title: 'Atoms/Td',
  component: Td,
  args: {
    children: 'Carbon-14',
    align: 'start',
    numeric: false,
  },
  argTypes: {
    align: { control: 'select', options: aligns },
    numeric: { control: 'boolean' },
  },
} satisfies Meta<typeof Td>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    (StoryFn) => (
      <table style={tableStyle}>
        <thead>
          <tr>
            <th scope="col">Isotope</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <StoryFn />
          </tr>
        </tbody>
      </table>
    ),
  ],
};

export const Alignments: Story = {
  render: () => (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th scope="col">align</th>
          <th scope="col">cell</th>
        </tr>
      </thead>
      <tbody>
        {aligns.map((align) => (
          <tr key={align}>
            <th scope="row">{align}</th>
            <Td align={align}>{`align: ${align}`}</Td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const Numeric: Story = {
  render: () => (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th scope="col">Isotope</th>
          <th scope="col">Half-life (years)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>Carbon-14</Td>
          <Td numeric>5,730</Td>
        </tr>
        <tr>
          <Td>Caesium-137</Td>
          <Td numeric>30.05</Td>
        </tr>
        <tr>
          <Td>Uranium-238</Td>
          <Td numeric>4,468,000,000</Td>
        </tr>
      </tbody>
    </table>
  ),
};

export const NumericOverridesAlign: Story = {
  render: () => (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th scope="col">props</th>
          <th scope="col">cell</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">align=&quot;start&quot; numeric</th>
          <Td align="start" numeric>
            1,234.56
          </Td>
        </tr>
        <tr>
          <th scope="row">align=&quot;center&quot; numeric</th>
          <Td align="center" numeric>
            78.90
          </Td>
        </tr>
      </tbody>
    </table>
  ),
};
