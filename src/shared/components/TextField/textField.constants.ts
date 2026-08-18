/** HeroUI field min-height: spacing * 12. */
export const FIELD_MIN_HEIGHT = 48;

/** HeroUI focus ring width; always reserved so the layout never shifts. */
export const FIELD_BORDER_WIDTH = 2;

/**
 * withTiming interpolates rgba, not the "transparent" keyword — animating to
 * the keyword drops the style entirely.
 */
export const CLEAR_BORDER = "rgba(0, 0, 0, 0)";

/** HeroUI text-field root gap: spacing * 1.5. */
export const FIELD_GAP = 6;

/** HeroUI renders every in-field icon at 16. */
export const FIELD_ICON_SIZE = 16;

/** HeroUI search-field clear button: spacing * 6, with a 14px icon. */
export const CLEAR_BUTTON_SIZE = 24;

export const CLEAR_ICON_SIZE = 14;

export const ICON_HIT_SLOP = 8;

/** Border tint on focus/invalid; matches the radio and checkbox tween. */
export const BORDER_TINT_MS = 100;

export const ERROR_ENTER_MS = 150;

export const ERROR_EXIT_MS = 100;

/** HeroUI --opacity-disabled. */
export const DISABLED_OPACITY = 0.5;
