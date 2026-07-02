import type { Meta, StoryObj } from '@storybook/react-vite';
import { Video } from './Video';
import type { VideoFit, VideoRadius } from './Video.types';

const radii: VideoRadius[] = ['none', 'sm', 'md', 'lg', 'xl'];
const fits: VideoFit[] = ['cover', 'contain'];
const ratios = ['16 / 9', '4 / 3', '1 / 1'];

const videoSrc = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

/** Tiny inline WebVTT file so every story ships a captions track. */
const captionsSrc = `data:text/vtt,${encodeURIComponent(
  'WEBVTT\n\n00:00:00.000 --> 00:00:05.000\n[Flower blooming — no dialogue]',
)}`;

const captions = <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />;

const meta = {
  title: 'Atoms/Video',
  component: Video,
  args: {
    src: videoSrc,
    'aria-label': 'Blooming flower (sample video)',
    radius: 'none',
    aspectRatio: '16 / 9',
    children: captions,
  },
  argTypes: {
    radius: { control: 'select', options: radii },
    fit: { control: 'select', options: fits },
    aspectRatio: { control: 'text' },
  },
} satisfies Meta<typeof Video>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Radii: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--iso-spacing-4)',
        maxWidth: 'var(--iso-size-container-md)',
      }}
    >
      {radii.map((radius) => (
        <Video
          key={radius}
          src={videoSrc}
          radius={radius}
          aspectRatio="16 / 9"
          aria-label={`radius ${radius}`}
        >
          {captions}
        </Video>
      ))}
    </div>
  ),
};

export const Fit: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--iso-spacing-4)',
        maxWidth: 'var(--iso-size-container-md)',
      }}
    >
      {fits.map((fit) => (
        // A square box around 16:9 footage: `contain` letterboxes onto the token
        // background, `cover` crops to fill.
        <Video
          key={fit}
          src={videoSrc}
          fit={fit}
          aspectRatio="1 / 1"
          radius="md"
          aria-label={`fit ${fit}`}
        >
          {captions}
        </Video>
      ))}
    </div>
  ),
};

export const AspectRatios: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--iso-spacing-4)',
        maxWidth: 'var(--iso-size-container-lg)',
        alignItems: 'start',
      }}
    >
      {ratios.map((ratio) => (
        <Video
          key={ratio}
          src={videoSrc}
          aspectRatio={ratio}
          fit="cover"
          radius="md"
          aria-label={`aspect ratio ${ratio}`}
        >
          {captions}
        </Video>
      ))}
    </div>
  ),
};

/**
 * Autoplay is only acceptable muted — never autoplay with sound. Controls stay on
 * (the default) so users can pause.
 */
export const MutedAutoplayLoop: Story = {
  args: {
    muted: true,
    autoPlay: true,
    loop: true,
    'aria-label': 'Blooming flower (decorative, muted)',
  },
};
