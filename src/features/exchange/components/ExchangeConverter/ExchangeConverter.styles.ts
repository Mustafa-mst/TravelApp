import { radius, spacing, themed } from "@shared/styles";

export const SWAP_ICON_SIZE = 18;

const SWAP_BUTTON_SIZE = 40;

export const exchangeConverterStyles = themed(({ colors }) => ({
  rows: {
    position: "relative",
    gap: spacing.sm,
  },
  swapButton: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
    marginTop: -SWAP_BUTTON_SIZE / 2,
    width: SWAP_BUTTON_SIZE,
    height: SWAP_BUTTON_SIZE,
    borderRadius: radius.full,
    borderWidth: 0,
    backgroundColor: colors.background,
  },
  swapIcon: {
    transform: [{ rotate: "270deg" }],
  },
  footer: {
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius["2xl"],
    borderCurve: "continuous",
    backgroundColor: colors.surfaceSecondary,
  },
}));
