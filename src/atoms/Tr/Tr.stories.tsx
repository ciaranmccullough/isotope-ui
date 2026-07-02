import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tr } from './Tr';

const isotopes = [
  { isotope: 'Carbon-14', halfLife: '5,730 years' },
  { isotope: 'Uranium-238', halfLife: '4.5 billion years' },
  { isotope: 'Iodine-131', halfLife: '8 days' },
  { isotope: 'Tritium', halfLife: '12.3 years' },
];

const tableStyle = { width: 'var(--iso-size-container-sm)' };
const cellStyle = { padding: 'var(--iso-spacing-2)', textAlign: 'start' as const };

const headerRow = (
  <thead>
    <Tr>
      <th scope="col" style={cellStyle}>
        Isotope
      </th>
      <th scope="col" style={cellStyle}>
        Half-life
      </th>
    </Tr>
  </thead>
);

const meta = {
  title: 'Atoms/Tr',
  component: Tr,
  args: {
    children: (
      <>
        <td style={cellStyle}>Carbon-14</td>
        <td style={cellStyle}>5,730 years</td>
      </>
    ),
    interactive: false,
  },
  argTypes: {
    interactive: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
} satisfies Meta<typeof Tr>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    (StoryFn) => (
      <table style={tableStyle}>
        <tbody>
          <StoryFn />
        </tbody>
      </table>
    ),
  ],
};

export const Interactive: Story = {
  render: () => (
    <table style={tableStyle}>
      {headerRow}
      <tbody>
        {isotopes.map((row) => (
          <Tr key={row.isotope} interactive>
            <td style={cellStyle}>{row.isotope}</td>
            <td style={cellStyle}>{row.halfLife}</td>
          </Tr>
        ))}
      </tbody>
    </table>
  ),
};

/**
 * `aria-selected` is only valid where the table pattern allows selection, so this demo uses
 * `role="grid"`. Every row opts in (`selected` true or false); interactive + selected rows get
 * the accent hover token.
 */
export const Selected: Story = {
  render: () => (
    <table role="grid" aria-label="Select an isotope" style={tableStyle}>
      {headerRow}
      <tbody>
        {isotopes.map((row, index) => (
          <Tr key={row.isotope} interactive selected={index === 1}>
            <td style={cellStyle}>{row.isotope}</td>
            <td style={cellStyle}>{row.halfLife}</td>
          </Tr>
        ))}
      </tbody>
    </table>
  ),
};

/**
 * Plain data tables must not carry `aria-selected` — leave `selected` unset and stripe via CSS
 * only (here: a token background on even rows).
 */
export const Zebra: Story = {
  render: () => (
    <table style={tableStyle}>
      {headerRow}
      <tbody>
        {isotopes.map((row, index) => (
          <Tr
            key={row.isotope}
            style={
              index % 2 === 1 ? { backgroundColor: 'var(--iso-color-surface-sunken)' } : undefined
            }
          >
            <td style={cellStyle}>{row.isotope}</td>
            <td style={cellStyle}>{row.halfLife}</td>
          </Tr>
        ))}
      </tbody>
    </table>
  ),
};
