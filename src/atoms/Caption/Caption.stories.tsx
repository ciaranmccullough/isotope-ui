import type { Meta, StoryObj } from '@storybook/react-vite';
import { Caption } from './Caption';
import type { CaptionAlign, CaptionSide } from './Caption.types';

const aligns: CaptionAlign[] = ['start', 'center', 'end'];
const sides: CaptionSide[] = ['top', 'bottom'];

const tableRows = (
  <>
    <thead>
      <tr>
        <th scope="col">Isotope</th>
        <th scope="col">Half-life</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Carbon-14</td>
        <td>5,730 years</td>
      </tr>
      <tr>
        <td>Uranium-238</td>
        <td>4.5 billion years</td>
      </tr>
    </tbody>
  </>
);

const tableStyle = { width: 'var(--iso-size-container-sm)' };

const meta = {
  title: 'Atoms/Caption',
  component: Caption,
  args: {
    children: 'Isotope half-lives',
    align: 'start',
    side: 'top',
  },
  argTypes: {
    align: { control: 'select', options: aligns },
    side: { control: 'select', options: sides },
  },
} satisfies Meta<typeof Caption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    (StoryFn) => (
      <table style={tableStyle}>
        <StoryFn />
        {tableRows}
      </table>
    ),
  ],
};

export const Alignments: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--iso-spacing-6)' }}>
      {aligns.map((align) => (
        <table key={align} style={tableStyle}>
          <Caption align={align}>{`align: ${align}`}</Caption>
          {tableRows}
        </table>
      ))}
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--iso-spacing-6)' }}>
      {sides.map((side) => (
        <table key={side} style={tableStyle}>
          <Caption side={side}>{`side: ${side}`}</Caption>
          {tableRows}
        </table>
      ))}
    </div>
  ),
};
