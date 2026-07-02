import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Image } from './Image';
import type { ImageFit, ImageRadius } from './Image.types';

const fits: ImageFit[] = ['cover', 'contain', 'fill', 'scale-down', 'none'];
const radii: ImageRadius[] = ['none', 'sm', 'md', 'lg', 'xl', 'full'];
const src = 'https://example.com/photo.jpg';

describe('Image', () => {
  it('renders a native img with its accessible name from alt', () => {
    render(<Image src={src} alt="A mountain lake" />);
    expect(screen.getByRole('img', { name: 'A mountain lake' })).toBeInTheDocument();
  });

  it('defaults to loading="lazy" and decoding="async"', () => {
    render(<Image src={src} alt="Lazy by default" />);
    const img = screen.getByRole('img', { name: 'Lazy by default' });
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  it('flips the default loading to "eager" when fetchPriority="high"', () => {
    render(<Image src={src} alt="Hero" fetchPriority="high" />);
    const img = screen.getByRole('img', { name: 'Hero' });
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  it('keeps the lazy default for non-high fetchPriority', () => {
    render(<Image src={src} alt="Low priority" fetchPriority="low" />);
    const img = screen.getByRole('img', { name: 'Low priority' });
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('fetchpriority', 'low');
  });

  it('lets an explicit loading prop win over the fetchPriority rule', () => {
    render(<Image src={src} alt="Explicitly lazy" fetchPriority="high" loading="lazy" />);
    expect(screen.getByRole('img', { name: 'Explicitly lazy' })).toHaveAttribute('loading', 'lazy');
  });

  it('lets explicit loading and decoding props win over the defaults', () => {
    render(<Image src={src} alt="Explicitly eager" loading="eager" decoding="sync" />);
    const img = screen.getByRole('img', { name: 'Explicitly eager' });
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('decoding', 'sync');
  });

  it.each(radii)('renders the %s radius', (radius) => {
    render(<Image src={src} alt={`radius-${radius}`} radius={radius} />);
    expect(screen.getByRole('img', { name: `radius-${radius}` })).toBeInTheDocument();
  });

  it.each(fits)('renders the %s fit', (fit) => {
    render(<Image src={src} alt={`fit-${fit}`} fit={fit} />);
    expect(screen.getByRole('img', { name: `fit-${fit}` })).toBeInTheDocument();
  });

  it('applies aspectRatio as an inline style', () => {
    render(<Image src={src} alt="Widescreen" aspectRatio="16 / 9" />);
    expect(screen.getByRole('img', { name: 'Widescreen' })).toHaveStyle({
      aspectRatio: '16 / 9',
    });
  });

  it('merges aspectRatio with a consumer style object', () => {
    render(
      <Image
        src={src}
        alt="Styled"
        aspectRatio="1 / 1"
        style={{ width: 'var(--iso-spacing-24)' }}
      />,
    );
    const img = screen.getByRole('img', { name: 'Styled' });
    expect(img).toHaveStyle({ aspectRatio: '1 / 1', width: 'var(--iso-spacing-24)' });
  });

  it('passes srcSet and sizes through to the native element', () => {
    render(
      <Image
        src={src}
        alt="Responsive"
        srcSet={`${src} 1x, https://example.com/photo@2x.jpg 2x`}
        sizes="100vw"
      />,
    );
    const img = screen.getByRole('img', { name: 'Responsive' });
    expect(img).toHaveAttribute('srcset', `${src} 1x, https://example.com/photo@2x.jpg 2x`);
    expect(img).toHaveAttribute('sizes', '100vw');
  });

  it('forwards its ref to the native img element and exposes native reads', () => {
    const ref = createRef<HTMLImageElement>();
    render(<Image ref={ref} src={src} alt="Ref target" />);
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
    expect(ref.current?.src).toBe(src);
  });

  it('fires the native onLoad callback', () => {
    // user-event cannot synthesize resource load events, so fireEvent is the right tool here.
    const onLoad = jest.fn();
    render(<Image src={src} alt="Loads" onLoad={onLoad} />);
    fireEvent.load(screen.getByRole('img', { name: 'Loads' }));
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations (informative and decorative)', async () => {
    const { container } = render(
      <>
        <Image src={src} alt="Informative photograph" radius="md" fit="cover" />
        <Image src={src} alt="" radius="full" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
