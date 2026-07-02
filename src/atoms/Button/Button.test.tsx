import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from './Button';
import type { ButtonEmphasis, ButtonSize, ButtonTone } from './Button.types';

const tones: ButtonTone[] = ['neutral', 'accent', 'positive', 'critical', 'caution'];
const emphases: ButtonEmphasis[] = ['solid', 'subtle', 'outline', 'ghost'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

describe('Button', () => {
  it('renders a native button with its accessible name', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('defaults type to "button" so it cannot accidentally submit forms', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'button');
  });

  it('respects an explicit type', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute('type', 'submit');
  });

  it.each(tones)('renders the %s tone in every emphasis and size', (tone) => {
    for (const emphasis of emphases) {
      for (const size of sizes) {
        const name = `${tone}-${emphasis}-${size}`;
        const { unmount } = render(
          <Button tone={tone} emphasis={emphasis} size={size}>
            {name}
          </Button>,
        );
        expect(screen.getByRole('button', { name })).toBeInTheDocument();
        unmount();
      }
    }
  });

  it('forwards its ref to the native button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Save</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toHaveTextContent('Save');
  });

  it('fires onClick when activated', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    );
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Button>Default</Button>
        <Button tone="accent" emphasis="outline" size="sm">
          Variant
        </Button>
        <Button disabled>Disabled</Button>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
