export const CHECKBOX_SIZE = 22;

export const CHECKBOX_ICON_SIZE = 16;

export const CHECKBOX_HIT_SLOP = 6;

/** Indicator reveal: opacity 0→1, translateX -4→0, scale 0.8→1. */
export const INDICATOR_MS = 100;

/** Box fill/border tween; not part of the documented indicator config. */
export const BOX_TINT_MS = 100;

/**
 * withTiming interpolates rgba, not the "transparent" keyword — animating to
 * the keyword drops the style entirely.
 */
export const CLEAR_FILL = "rgba(0, 0, 0, 0)";
