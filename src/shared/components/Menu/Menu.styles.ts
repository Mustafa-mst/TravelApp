import { radius, spacing, themed, type ColorToken } from "@shared/styles";

import {
  MENU_DOT_SIZE,
  MENU_MIN_WIDTH,
  MENU_SURFACE_INSET,
} from "./menu.constants";
import type { MenuItemVariant } from "./menu.types";

export const menuStyles = themed(({ colors, shadows, elevatedBorder }) => ({
  // Invisible: it only catches outside taps, matching HeroUI's overlay.
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // iOS shadow goes on the outer layer, since the inner one clips and a
  // clipped shadow is not drawn. `elevation` is deliberately left off: Android
  // derives it from the view's own background, and this layer has none — it
  // would paint a plain black rectangle behind the menu.
  position: {
    position: "absolute",
    minWidth: MENU_MIN_WIDTH,
    borderRadius: radius.xl,
    shadowColor: shadows.overlay.shadowColor,
    shadowOffset: shadows.overlay.shadowOffset,
    shadowOpacity: shadows.overlay.shadowOpacity,
    shadowRadius: shadows.overlay.shadowRadius,
  },
  surface: {
    flexShrink: 1,
    // Inset so a pressed row's rounded highlight reads as an island rather than
    // running edge to edge.
    paddingHorizontal: MENU_SURFACE_INSET,
    paddingVertical: spacing.sm + spacing.xs,
    borderRadius: radius.xl,
    backgroundColor: colors.overlay,
    overflow: "hidden",
    // Paired with the background above, so Android has a shape to cast from.
    elevation: shadows.overlay.elevation,
    ...elevatedBorder,
  },
  // Text is indented to match the row padding, so labels sit flush with titles.
  label: {
    paddingHorizontal: spacing.sm + spacing.xs / 2,
    paddingTop: spacing.xs / 2,
    paddingBottom: spacing.xs,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + spacing.xs / 2,
    paddingHorizontal: spacing.sm + spacing.xs / 2,
    paddingVertical: spacing.sm,
    // On the row itself, so the press highlight has rounded corners.
    borderRadius: radius["2xl"],
  },
  rowPressed: {
    backgroundColor: colors.surfaceHover,
  },
  rowContent: {
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  dot: {
    width: MENU_DOT_SIZE,
    height: MENU_DOT_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
  },
  indicatorSlot: {
    alignItems: "center",
    justifyContent: "center",
  },
  submenu: {
    overflow: "hidden",
  },
  submenuMeasure: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  submenuInner: {
    paddingLeft: spacing.sm + spacing.xs / 2,
  },
}));

type MenuItemPalette = {
  label: ColorToken;
  icon: ColorToken;
};

export const menuItemVariants: Record<MenuItemVariant, MenuItemPalette> = {
  default: { label: "foreground", icon: "muted" },
  danger: { label: "danger", icon: "danger" },
};
