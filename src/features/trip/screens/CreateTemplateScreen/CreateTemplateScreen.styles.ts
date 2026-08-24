import { spacing, themed } from "@shared/styles";

const FOOTER_INSET = spacing.md - 4;

export const createTemplateScreenStyles = themed(({ colors }) => ({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    overflow: "hidden",
  },
  footer: {
    paddingHorizontal: FOOTER_INSET,
  },
}));
