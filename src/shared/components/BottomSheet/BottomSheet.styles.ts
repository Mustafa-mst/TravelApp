import { radius, themed } from "@shared/styles";
import type { BottomSheetVariant } from "./bottomSheet.types";

export const bottomSheetStyles = themed(({ colors, elevatedBorder, shadows }) => ({
  background: {
    backgroundColor: colors.overlay,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    ...elevatedBorder,
  },
  header: {
    backgroundColor: colors.overlay,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: 24,
    paddingBottom: 12,
  },
  squareTop: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  // zIndex keeps the shadow above the content instead of under it.
  headerElevated: {
    ...shadows.surface,
    zIndex: 1,
  },
  indicator: {
    backgroundColor: colors.separator,
    width: 36,
    height: 4,
    borderRadius: radius.full,
    position: "absolute",
    alignSelf: "center",
    top: 10,
  },
  content: {
    flexShrink: 1,
  },
  contentFill: {
    flex: 1,
  },
}));

export const bottomSheetVariants: Record<
  BottomSheetVariant,
  { squareTop: boolean; showIndicator: boolean }
> = {
  // A page fills the screen, so rounded corners and a grabber would be lies.
  sheet: { squareTop: false, showIndicator: true },
  page: { squareTop: true, showIndicator: false },
};
