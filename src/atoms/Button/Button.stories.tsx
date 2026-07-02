import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import type { ButtonEmphasis, ButtonTone } from './Button.types';

const tones: ButtonTone[] = ['neutral', 'accent', 'positive', 'critical', 'caution'];
const emphases: ButtonEmphasis[] = ['solid', 'subtle', 'outline', 'ghost'];

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: 'Button',
    tone: 'neutral',
    emphasis: 'solid',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    tone: { control: 'select', options: tones },
    emphasis: { control: 'select', options: emphases },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ToneEmphasisMatrix: Story = {
  render: () => (
    <table>
      <thead>
        <tr>
          <th scope="col">tone</th>
          {emphases.map((emphasis) => (
            <th scope="col" key={emphasis}>
              {emphasis}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tones.map((tone) => (
          <tr key={tone}>
            <th scope="row">{tone}</th>
            {emphases.map((emphasis) => (
              <td key={emphasis} style={{ padding: 'var(--iso-spacing-2)' }}>
                <Button tone={tone} emphasis={emphasis}>
                  Button
                </Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-3)' }}>
      {emphases.map((emphasis) => (
        <Button key={emphasis} emphasis={emphasis} disabled>
          {emphasis}
        </Button>
      ))}
    </div>
  ),
};
