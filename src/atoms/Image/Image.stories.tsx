import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './Image';
import type { ImageFit, ImageRadius } from './Image.types';

const fits: ImageFit[] = ['cover', 'contain', 'fill', 'scale-down', 'none'];
const radii: ImageRadius[] = ['none', 'sm', 'md', 'lg', 'xl', 'full'];

const landscape = 'https://picsum.photos/seed/isotope-ui/800/450';
const square = 'https://picsum.photos/seed/isotope-ui/400/400';

const meta = {
  title: 'Atoms/Image',
  component: Image,
  args: {
    src: landscape,
    alt: 'Randomly generated placeholder photograph',
    radius: 'none',
  },
  argTypes: {
    fit: { control: 'select', options: fits },
    radius: { control: 'select', options: radii },
    aspectRatio: { control: 'text' },
    fetchPriority: { control: 'select', options: ['high', 'low', 'auto'] },
    loading: { control: 'select', options: ['lazy', 'eager'] },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Defaults in action: `loading="lazy"`, `decoding="async"`, no fit, `radius="none"`. */
export const Playground: Story = {};

export const Radii: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-4)', flexWrap: 'wrap' }}>
      {radii.map((radius) => (
        <figure key={radius} style={{ margin: 0, textAlign: 'center' }}>
          <Image
            src={square}
            alt={`Placeholder with ${radius} radius`}
            radius={radius}
            fit="cover"
            aspectRatio="1 / 1"
            style={{ width: 'var(--iso-size-avatar-xl)' }}
          />
          <figcaption>{radius}</figcaption>
        </figure>
      ))}
    </div>
  ),
};

export const Fits: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-4)', flexWrap: 'wrap' }}>
      {fits.map((fit) => (
        <figure key={fit} style={{ margin: 0, textAlign: 'center' }}>
          {/* A fixed square box so each object-fit behavior is visible on a 16:9 source. */}
          <Image
            src={landscape}
            alt={`Placeholder demonstrating object-fit ${fit}`}
            fit={fit}
            radius="sm"
            style={{
              width: 'var(--iso-spacing-24)',
              height: 'var(--iso-spacing-24)',
              border: 'var(--iso-border-width-1) solid var(--iso-color-border)',
            }}
          />
          <figcaption>{fit}</figcaption>
        </figure>
      ))}
    </div>
  ),
};

export const AspectRatios: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--iso-spacing-4)', flexWrap: 'wrap' }}>
      {['16 / 9', '4 / 3', '1 / 1'].map((aspectRatio) => (
        <figure key={aspectRatio} style={{ margin: 0, textAlign: 'center' }}>
          <Image
            src={landscape}
            alt={`Placeholder cropped to ${aspectRatio}`}
            aspectRatio={aspectRatio}
            fit="cover"
            radius="md"
            style={{ width: 'var(--iso-size-container-sm)', maxWidth: '40%' }}
          />
          <figcaption>{aspectRatio}</figcaption>
        </figure>
      ))}
    </div>
  ),
};

/**
 * `fetchPriority="high"` flips the default `loading` to `"eager"` — a hero/LCP image should
 * not lazy-load. Inspect the rendered `<img>`: `loading="eager"`, `fetchpriority="high"`.
 */
export const HighPriority: Story = {
  args: {
    fetchPriority: 'high',
    aspectRatio: '16 / 9',
    fit: 'cover',
    alt: 'High-priority hero placeholder',
  },
};

/** Explicit props always win: this image is high-priority yet explicitly lazy. */
export const ExplicitLoadingWins: Story = {
  args: {
    fetchPriority: 'high',
    loading: 'lazy',
    alt: 'High-priority placeholder that explicitly opts back into lazy loading',
  },
};

/** Responsive passthrough: `srcSet` + `sizes` go straight to the native element. */
export const ResponsiveSources: Story = {
  args: {
    srcSet: `https://picsum.photos/seed/isotope-ui/400/225 400w, ${landscape} 800w, https://picsum.photos/seed/isotope-ui/1600/900 1600w`,
    sizes: '(max-width: 640px) 100vw, 50vw',
    alt: 'Responsive placeholder served from a srcset',
  },
};

/** Decorative image: `alt=""` is valid and removes it from the accessibility tree. */
export const Decorative: Story = {
  args: {
    alt: '',
    radius: 'lg',
  },
};
