import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Video } from './Video';
import type { VideoFit, VideoRadius } from './Video.types';

const radii: VideoRadius[] = ['none', 'sm', 'md', 'lg', 'xl'];
const fits: VideoFit[] = ['cover', 'contain'];

const captionsSrc = `data:text/vtt,${encodeURIComponent(
  'WEBVTT\n\n00:00:00.000 --> 00:00:02.000\n[No dialogue]',
)}`;

// `<video>` has no implicit ARIA role, so queries go through the accessible name
// (aria-label / getByLabelText) instead of getByRole. jsdom cannot play media —
// these tests assert attributes and DOM structure only, never playback.
describe('Video', () => {
  it('renders a native video with its accessible name', () => {
    render(<Video src="movie.mp4" aria-label="Product tour" />);
    expect(screen.getByLabelText('Product tour')).toBeInstanceOf(HTMLVideoElement);
  });

  it('applies sensible defaults: controls, playsInline, preload="metadata"', () => {
    render(<Video src="movie.mp4" aria-label="Defaults" />);
    const video = screen.getByLabelText('Defaults');
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('playsinline');
    expect(video).toHaveAttribute('preload', 'metadata');
  });

  it('lets explicit props win over the defaults', () => {
    render(
      <Video
        src="movie.mp4"
        aria-label="Overridden"
        controls={false}
        playsInline={false}
        preload="none"
      />,
    );
    const video = screen.getByLabelText('Overridden');
    expect(video).not.toHaveAttribute('controls');
    expect(video).not.toHaveAttribute('playsinline');
    expect(video).toHaveAttribute('preload', 'none');
  });

  it.each(radii)('renders the %s radius', (radius) => {
    render(<Video src="movie.mp4" radius={radius} aria-label={`radius-${radius}`} />);
    expect(screen.getByLabelText(`radius-${radius}`)).toBeInstanceOf(HTMLVideoElement);
  });

  it.each(fits)('renders the %s fit', (fit) => {
    render(<Video src="movie.mp4" fit={fit} aria-label={`fit-${fit}`} />);
    expect(screen.getByLabelText(`fit-${fit}`)).toBeInstanceOf(HTMLVideoElement);
  });

  it('applies aspectRatio as an inline style merged with the consumer style', () => {
    render(
      <Video
        src="movie.mp4"
        aria-label="Ratio"
        aspectRatio="16 / 9"
        style={{ display: 'inline-block' }}
      />,
    );
    expect(screen.getByLabelText('Ratio')).toHaveStyle({
      aspectRatio: '16 / 9',
      display: 'inline-block',
    });
  });

  it('forwards its ref to the native video element and exposes attributes through it', () => {
    const ref = createRef<HTMLVideoElement>();
    render(<Video ref={ref} src="movie.mp4" aria-label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLVideoElement);
    expect(ref.current?.getAttribute('preload')).toBe('metadata');
  });

  it('passes children (the captions track) through to the native element', () => {
    const ref = createRef<HTMLVideoElement>();
    render(
      <Video ref={ref} src="movie.mp4" aria-label="Captioned">
        <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />
      </Video>,
    );
    const track = ref.current?.querySelector('track');
    expect(track).toHaveAttribute('kind', 'captions');
  });

  it('fires onClick when activated', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Video src="movie.mp4" aria-label="Clickable" onClick={onClick} />);
    await user.click(screen.getByLabelText('Clickable'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Video src="movie.mp4" aria-label="Default">
          <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />
        </Video>
        <Video src="movie.mp4" aria-label="Variant" radius="lg" fit="cover" aspectRatio="4 / 3">
          <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />
        </Video>
      </>,
    );
    // preload: false — axe otherwise waits for media metadata (`loadedmetadata`),
    // which jsdom never fires. The video-caption rule still runs and must pass.
    expect(await axe(container, { preload: false })).toHaveNoViolations();
  });
});
