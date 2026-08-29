export const RADIO_SIZE = 22;

export const RADIO_THUMB_SIZE = 10;

export const RADIO_HIT_SLOP = 6;

/** Thumb reveal: scale 1.5→1 with the ring, matching the documented default. */
export const THUMB_SCALE_UNSELECTED = 1.5;

export const THUMB_SCALE_SELECTED = 1;

export const THUMB_MS = 100;

/** Ring fill/border tween; not part of the documented thumb config. */
export const RING_TINT_MS = 100;

export const DISABLED_OPACITY = 0.4;

/**
 * withTiming interpolates rgba, not the "transparent" keyword — animating to
 * the keyword drops the style entirely.
 */
export const CLEAR_FILL = "rgba(0, 0, 0, 0)";
