/** HeroUI .select__trigger gap: spacing * 3. */
export const SELECT_TRIGGER_GAP = 12;

/** HeroUI TriggerIndicator iconProps.size default. */
export const SELECT_INDICATOR_SIZE = 16;

/** HeroUI select.animation.ts chevron rotation, in degrees. */
export const SELECT_INDICATOR_ROTATION: [number, number] = [0, -180];

export const SELECT_INDICATOR_SPRING = {
  damping: 140,
  stiffness: 1000,
  mass: 4,
};

/** HeroUI .select__content padding: spacing * 3. */
export const SELECT_CONTENT_PADDING = 12;

/** HeroUI .select__item: gap spacing * 2, padding spacing * 2 / spacing * 3. */
export const SELECT_ITEM_GAP = 8;
export const SELECT_ITEM_PADDING_H = 8;
export const SELECT_ITEM_PADDING_V = 12;

/** HeroUI .select__item-indicator: spacing * 5. */
export const SELECT_ITEM_INDICATOR_SIZE = 20;

/** HeroUI .select__list-label: padding spacing * 2 / spacing * 1.5. */
export const SELECT_LIST_LABEL_PADDING_H = 8;
export const SELECT_LIST_LABEL_PADDING_V = 6;

/** HeroUI Content.offset default. */
export const SELECT_OFFSET = 8;

export const SELECT_SCREEN_PADDING = 12;
export const SELECT_MIN_WIDTH = 180;

/**
 * Deeper than the `overlay` token. HeroUI stacks three box-shadow layers for
 * its overlays; RN allows one, and the token's collapsed 0.06 reads as no
 * shadow at all against a light background.
 */
export const SELECT_SHADOW_OFFSET = { width: 0, height: 8 };
export const SELECT_SHADOW_OPACITY = 0.18;
export const SELECT_SHADOW_RADIUS = 24;

export const SELECT_ENTER_MS = 140;
export const SELECT_EXIT_MS = 100;

export const SELECT_PRESS_SCALE = 0.98;

/** Joins the labels of a multiple selection in the trigger. */
export const SELECT_VALUE_SEPARATOR = ", ";

/** Gives the centred empty state room when the surface hugs its content. */
export const SELECT_EMPTY_PADDING_V = 20;
