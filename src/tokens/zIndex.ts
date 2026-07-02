/**
 * Stacking order. CSS: `--iso-z-<key>`.
 * Note: `<dialog>.showModal()` renders in the browser's top layer and needs no z-index —
 * these tokens are for non-top-layer stacking.
 */
export const zIndex = {
  base: '0',
  raised: '1',
  dropdown: '1000',
  sticky: '1100',
  overlay: '1200',
  modal: '1300',
  toast: '1400',
  tooltip: '1500',
} as const;

export type ZIndexToken = keyof typeof zIndex;
