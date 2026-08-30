import { radius, spacing, themed, type ColorToken } from "@shared/styles";

import {
  DISABLED_OPACITY,
  FIELD_BORDER_WIDTH,
  FIELD_GAP,
  FIELD_MIN_HEIGHT,
} from "../TextField/textField.constants";
import {
  SELECT_CONTENT_PADDING,
  SELECT_EMPTY_PADDING_V,
  SELECT_ITEM_GAP,
  SELECT_ITEM_INDICATOR_SIZE,
  SELECT_ITEM_PADDING_H,
  SELECT_ITEM_PADDING_V,
  SELECT_LIST_LABEL_PADDING_H,
  SELECT_LIST_LABEL_PADDING_V,
  SELECT_MIN_WIDTH,
  SELECT_SHADOW_OFFSET,
  SELECT_SHADOW_OPACITY,
  SELECT_SHADOW_RADIUS,
  SELECT_TRIGGER_GAP,
} from "./select.constants";
import type { SelectVariant } from "./select.types";

export const selectStyles = themed(({ colors, shadows, elevatedBorder }) => ({
  container: {
    gap: FIELD_GAP,
  },
  /** Carries the ring and background; the inner row owns the touch area. */
  fieldOuter: {
    borderWidth: FIELD_BORDER_WIDTH,
    borderRadius: radius.field,
  },
  fieldElevated: {
    ...shadows.level1,
  },
  fieldBordered: {
    ...shadows.field,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: FIELD_MIN_HEIGHT,
    paddingHorizontal: spacing.sm + 4,
    gap: SELECT_TRIGGER_GAP,
    borderRadius: radius.field,
  },
  /**
   * lineHeight is dropped from the variant: iOS ignores includeFontPadding and
   * sinks glyphs inside a taller line box, pushing single-line text downward.
   */
  value: {
    flex: 1,
    lineHeight: undefined,
    includeFontPadding: false,
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
  },
  // Invisible: it only catches outside taps, matching HeroUI's overlay.
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // iOS shadow goes on the outer layer, since the inner one clips and a
  // clipped shadow is not drawn. It needs its own opaque background: iOS
  // derives the shadow shape from what the layer paints, so a transparent one
  // casts almost nothing. `elevation` still belongs to the inner layer.
  position: {
    position: "absolute",
    minWidth: SELECT_MIN_WIDTH,
    borderRadius: radius.xl,
    backgroundColor: colors.overlay,
    shadowColor: shadows.overlay.shadowColor,
    shadowOffset: SELECT_SHADOW_OFFSET,
    shadowOpacity: SELECT_SHADOW_OPACITY,
    shadowRadius: SELECT_SHADOW_RADIUS,
  },
  // HeroUI's .select__content uses --radius-3xl (24); this follows Menu's
  // radius.xl instead so the two floating surfaces match on screen.
  surface: {
    flexShrink: 1,
    padding: SELECT_CONTENT_PADDING,
    borderRadius: radius.xl,
    backgroundColor: colors.overlay,
    overflow: "hidden",
    // Paired with the background above, so Android has a shape to cast from.
    elevation: shadows.overlay.elevation,
    ...elevatedBorder,
  },
  listLabel: {
    paddingHorizontal: SELECT_LIST_LABEL_PADDING_H,
    paddingVertical: SELECT_LIST_LABEL_PADDING_V,
  },
  empty: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SELECT_ITEM_PADDING_H,
    paddingVertical: SELECT_EMPTY_PADDING_V,
  },
  /**
   * The scale wrapper must span the full row: transform: scale works from the
   * view's centre, so a wrapper narrower than the row shrinks off-centre and
   * the row appears to pull to one side.
   */
  rowContainer: {
    alignSelf: "stretch",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: SELECT_ITEM_GAP,
    paddingHorizontal: SELECT_ITEM_PADDING_H,
    paddingVertical: SELECT_ITEM_PADDING_V,
    // On the row itself, so the press highlight has rounded corners.
    borderRadius: radius["2xl"],
  },
  rowPressed: {
    backgroundColor: colors.surfaceHover,
  },
  rowContent: {
    flex: 1,
  },
  indicatorSlot: {
    width: SELECT_ITEM_INDICATOR_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetContent: {
    gap: SELECT_ITEM_GAP / 2,
  },
  sheetCard: {
    flex: 1,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  sheetCardContent: {
    paddingHorizontal: spacing.md,
  },
  disabled: {
    opacity: DISABLED_OPACITY,
  },
}));

type SelectPalette = {
  background: ColorToken;
  border: ColorToken;
  borderFocused: ColorToken;
  bordered: boolean;
};

export const selectVariants: Record<SelectVariant, SelectPalette> = {
  primary: {
    background: "fieldBackground",
    border: "fieldBorder",
    borderFocused: "focus",
    bordered: false,
  },
  primaryBorder: {
    background: "fieldBackground",
    border: "border",
    borderFocused: "focus",
    bordered: true,
  },
  secondary: {
    background: "default",
    border: "fieldBorder",
    borderFocused: "focus",
    bordered: false,
  },
};
