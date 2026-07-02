import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Avatar } from './Avatar';
import type { AvatarSize } from './Avatar.types';

const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const src = 'https://example.com/ada.png';

describe('Avatar', () => {
  it('renders a native <img> with its accessible name when src is set', () => {
    render(<Avatar src={src} alt="Ada Lovelace" />);
    const img = screen.getByRole('img', { name: 'Ada Lovelace' });
    expect(img).toBeInstanceOf(HTMLImageElement);
  });

  it('renders the initials fallback with role="img", labelled by name, when src is absent', () => {
    render(<Avatar name="Ada Lovelace" />);
    const fallback = screen.getByRole('img', { name: 'Ada Lovelace' });
    expect(fallback).toBeInstanceOf(HTMLSpanElement);
    expect(fallback).toHaveTextContent('AL');
  });

  it.each([
    ['Ada Lovelace', 'Ada Lovelace', 'AL'],
    ['Grace Brewster Hopper', 'Grace Brewster Hopper', 'GH'],
    ['Cher', 'Cher', 'C'],
    ['ada lovelace', 'ada lovelace', 'AL'],
    ['  Ada   Lovelace  ', 'Ada Lovelace', 'AL'],
  ])('computes initials for %p', (name, accessibleName, initials) => {
    render(<Avatar name={name} />);
    expect(screen.getByRole('img', { name: accessibleName })).toHaveTextContent(initials);
  });

  it.each(sizes)('renders the %s size in both branches', (size) => {
    const image = render(<Avatar src={src} alt={`Portrait ${size}`} size={size} />);
    expect(screen.getByRole('img', { name: `Portrait ${size}` })).toBeInTheDocument();
    image.unmount();

    render(<Avatar name={`Fallback ${size}`} size={size} />);
    expect(screen.getByRole('img', { name: `Fallback ${size}` })).toBeInTheDocument();
  });

  it('forwards its ref to the native <img>, exposing src for uncontrolled reads', () => {
    const ref = createRef<HTMLImageElement | HTMLSpanElement>();
    render(<Avatar ref={ref} src={src} alt="Ada Lovelace" />);
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
    expect(ref.current instanceof HTMLImageElement && ref.current.src).toBe(src);
  });

  it('forwards its ref to the native <span> in the fallback branch', () => {
    const ref = createRef<HTMLImageElement | HTMLSpanElement>();
    render(<Avatar ref={ref} name="Ada Lovelace" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveTextContent('AL');
  });

  it('forwards native handlers: onClick fires on interaction', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Avatar src={src} alt="Ada Lovelace" onClick={onClick} />);
    await user.click(screen.getByRole('img', { name: 'Ada Lovelace' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('surfaces image load errors to the consumer via onError (the atom stays dumb)', () => {
    const onError = jest.fn();
    render(<Avatar src={src} alt="Ada Lovelace" onError={onError} />);
    // jsdom never loads images and user-event cannot synthesize a load failure,
    // so dispatch the native error event directly.
    fireEvent.error(screen.getByRole('img', { name: 'Ada Lovelace' }));
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations in either branch', async () => {
    const { container } = render(
      <>
        <Avatar src={src} alt="Ada Lovelace" size="sm" />
        <Avatar name="Grace Hopper" size="xl" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
