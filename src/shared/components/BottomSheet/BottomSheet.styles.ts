import { radius, themed } from "@shared/styles";

export const bottomSheetStyles = themed(({ colors, elevatedBorder }) => ({
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
