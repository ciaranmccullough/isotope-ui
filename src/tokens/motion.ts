/**
 * Motion tokens — the only legal source of durations and easings.
 * CSS: `--iso-duration-<key>`, `--iso-easing-<key>`.
 */
export const motion = {
  duration: {
    instant: '0ms',
    fast: '120ms',
    base: '200ms',
    slow: '320ms',
    slower: '480ms',
    /** Looping/ambient animation cycle (skeleton shimmer, spinners) — not for transitions. */
    loop: '1600ms',
  },
  easing: {
    /** General-purpose: settles quickly without overshoot. */
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    /** Elements entering the screen: decelerate. */
    enter: 'cubic-bezier(0, 0, 0.2, 1)',
    /** Elements leaving the screen: accelerate. */
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
    linear: 'linear',
  },
} as const;

export type DurationToken = keyof typeof motion.duration;
export type EasingToken = keyof typeof motion.easing;
