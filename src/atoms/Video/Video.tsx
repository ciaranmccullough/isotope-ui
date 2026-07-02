import { forwardRef } from 'react';
import type { VideoProps } from './Video.types';
import styles from './Video.module.css';

/**
 * Native `<video>` with sensible defaults. Pain points removed: `playsInline` defaults to
 * `true` (no forced fullscreen takeover on iOS), `preload` defaults to `"metadata"` (no eager
 * full-file download), and `controls` defaults to `true` (keyboard-operable out of the box).
 * Explicit props always win over these defaults.
 *
 * Captions are the consumer's contract: pass a `<track kind="captions">` as children, and
 * never autoplay with sound (if you set `autoPlay`, set `muted` too).
 */
export const Video = forwardRef<HTMLVideoElement, VideoProps>(function Video(
  {
    radius = 'none',
    fit,
    aspectRatio,
    playsInline = true,
    preload = 'metadata',
    controls = true,
    className,
    style,
    ...rest
  },
  ref,
) {
  const classes = [styles.video, styles[`radius-${radius}`], fit && styles[`fit-${fit}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    // The consumer's <track kind="captions"> arrives opaquely as children via {...rest}, so
    // the static rule cannot see it. The captions requirement is documented in CLAUDE.md and
    // still enforced at runtime by axe's video-caption rule in consumer tests.
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={ref}
      playsInline={playsInline}
      preload={preload}
      controls={controls}
      className={classes}
      style={aspectRatio !== undefined ? { ...style, aspectRatio } : style}
      {...rest}
    />
  );
});
