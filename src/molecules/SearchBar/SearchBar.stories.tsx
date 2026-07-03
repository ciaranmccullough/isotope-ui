import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchBar } from './SearchBar';
import type { SearchBarSize } from './SearchBar.types';

const sizes: SearchBarSize[] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  args: {
    label: 'Search',
    placeholder: 'Search…',
    size: 'md',
    disabled: false,
    invalid: false,
  },
  argTypes: {
    size: { control: 'select', options: sizes },
    onSubmit: { control: false },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--iso-spacing-3)' }}>
      {sizes.map((size) => (
        <SearchBar
          key={size}
          label={`Search (${size})`}
          placeholder={`Search (${size})…`}
          size={size}
        />
      ))}
    </div>
  ),
};

export const WithShortcutHint: Story = {
  args: {
    placeholder: 'Search candidates, companies, jobs…',
    shortcutHint: '⌘K',
  },
  render: (args) => <SearchBar {...args} style={{ inlineSize: 'var(--iso-size-container-xs)' }} />,
};

export const DefaultValue: Story = {
  args: {
    defaultValue: 'design systems',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    shortcutHint: '⌘K',
    placeholder: 'Search…',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    defaultValue: 'quer%%y',
  },
};

export const SubmitViaFormData: Story = {
  name: 'Submit (FormData)',
  render: () => (
    <SearchBar
      label="Search jobs"
      name="q"
      placeholder="Press Enter to submit…"
      onSubmit={(event) => {
        event.preventDefault();
        const query = new FormData(event.currentTarget).get('q');
        alert(`FormData q = ${String(query)}`);
      }}
    />
  ),
};

export const NativeGetSearch: Story = {
  name: 'Zero-JS GET search',
  render: () => (
    <SearchBar
      action="/search"
      label="Search the docs"
      name="q"
      placeholder="Navigates to /search?q=…"
    />
  ),
};
