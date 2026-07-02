import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Toast } from './Toast';
import type { ToastTone } from './Toast.types';

const tones: ToastTone[] = ['neutral', 'accent', 'positive', 'critical', 'caution'];

/** Consumer-supplied tone glyph — the Toast renders it inside an aria-hidden slot. */
const toneGlyph = (
  <Icon size="sm">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z" />
  </Icon>
);

const stack = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--iso-spacing-3)',
  maxWidth: 'var(--iso-size-container-sm)',
} as const;

const meta = {
  title: 'Molecules/Toast',
  component: Toast,
  args: {
    title: 'Changes saved',
    description: 'Your profile is up to date.',
    tone: 'neutral',
    role: 'status',
    dismissLabel: 'Dismiss',
  },
  argTypes: {
    tone: { control: 'select', options: tones },
    role: { control: 'select', options: ['status', 'alert'] },
    icon: { control: false },
    action: { control: false },
    onDismiss: { control: false },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={stack}>
      {tones.map((tone) => (
        <Toast
          key={tone}
          tone={tone}
          title={`A ${tone} toast`}
          description="Something happened that you should know about."
        />
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={stack}>
      {tones.map((tone) => (
        <Toast
          key={tone}
          tone={tone}
          icon={toneGlyph}
          title={`A ${tone} toast`}
          description="The icon slot inherits the tone color via currentColor."
        />
      ))}
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div style={stack}>
      <Toast title="Plain toast" description="No icon slot — the text column starts flush." />
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div style={stack}>
      <Toast
        tone="accent"
        icon={toneGlyph}
        title="Message archived"
        description="The conversation was moved out of your inbox."
        action={
          <Button tone="accent" emphasis="outline" size="sm">
            Undo
          </Button>
        }
      />
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <div style={stack}>
      {tones.map((tone) => (
        <Toast
          key={tone}
          tone={tone}
          icon={toneGlyph}
          title={`A ${tone} toast`}
          description="The unit is stateless — the consumer removes it in onDismiss."
          // The consumer (or the ToastRegion organism) owns removal; no-op here.
          onDismiss={() => undefined}
        />
      ))}
    </div>
  ),
};

export const AlertRole: Story = {
  render: () => (
    <div style={stack}>
      <Toast
        role="alert"
        tone="critical"
        icon={toneGlyph}
        title="Connection lost"
        description="Changes can no longer be saved. Announced assertively via role=alert."
        onDismiss={() => undefined}
      />
    </div>
  ),
};
