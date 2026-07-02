import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Icon } from './Icon';
import type { IconSize } from './Icon.types';

const sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const star = (
  <path d="M12 2l2.917 6.253 6.833.68-5.125 4.58 1.459 6.737L12 16.77 5.916 20.25l1.459-6.737-5.125-4.58 6.833-.68L12 2z" />
);

describe('Icon', () => {
  it('renders role="img" with its accessible name when labelled', () => {
    render(<Icon label="Favourite">{star}</Icon>);
    const icon = screen.getByRole('img', { name: 'Favourite' });
    expect(icon).toBeInTheDocument();
    expect(icon).not.toHaveAttribute('aria-hidden');
  });

  it('is decorative by default: aria-hidden, unfocusable, no role', () => {
    const ref = createRef<SVGSVGElement>();
    render(<Icon ref={ref}>{star}</Icon>);
    expect(ref.current).toHaveAttribute('aria-hidden', 'true');
    expect(ref.current).toHaveAttribute('focusable', 'false');
    expect(ref.current).not.toHaveAttribute('role');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('defaults viewBox to "0 0 24 24" and accepts an override', () => {
    render(
      <>
        <Icon label="Default box">{star}</Icon>
        <Icon label="Custom box" viewBox="0 0 16 16">
          {star}
        </Icon>
      </>,
    );
    expect(screen.getByRole('img', { name: 'Default box' })).toHaveAttribute(
      'viewBox',
      '0 0 24 24',
    );
    expect(screen.getByRole('img', { name: 'Custom box' })).toHaveAttribute('viewBox', '0 0 16 16');
  });

  it.each(sizes)('renders the %s size', (size) => {
    render(
      <Icon size={size} label={`icon-${size}`}>
        {star}
      </Icon>,
    );
    expect(screen.getByRole('img', { name: `icon-${size}` })).toBeInTheDocument();
  });

  it('forwards its ref to the native svg element', () => {
    const ref = createRef<SVGSVGElement>();
    render(
      <Icon ref={ref} label="Favourite">
        {star}
      </Icon>,
    );
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
    expect(ref.current).toBe(screen.getByRole('img', { name: 'Favourite' }));
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Icon label="Favourite" onClick={onClick}>
        {star}
      </Icon>,
    );
    await user.click(screen.getByRole('img', { name: 'Favourite' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Icon>{star}</Icon>
        <Icon label="Favourite" size="lg">
          {star}
        </Icon>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
