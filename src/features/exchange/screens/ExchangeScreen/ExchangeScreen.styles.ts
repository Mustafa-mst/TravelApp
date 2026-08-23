import { radius, spacing, themed } from "@shared/styles";

const HERO_RATE_FONT_SIZE = 56;
const HERO_RATE_LINE_HEIGHT = 64;
const SWAP_BUTTON_SIZE = 40;
const DIVIDER_HEIGHT = 1;

export const exchangeScreenStyles = themed(({ colors, shadows }) => ({
  scroll: {
    flex: 1,
  },
  container: {
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },

  hero: {
    alignItems: "center",
    gap: spacing.xs,
  },
  heroRate: {
    fontSize: HERO_RATE_FONT_SIZE,
    lineHeight: HERO_RATE_LINE_HEIGHT,
    marginTop: spacing.sm,
  },
  heroRateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },

  converterWrap: {
    position: "relative",
  },
  converterCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.md,
    ...shadows.level1,
  },
  divider: {
    height: DIVIDER_HEIGHT,
    backgroundColor: colors.separatorSecondary,
  },
  // Centred on the seam between the two converter rows.
  swapButton: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
    marginTop: -SWAP_BUTTON_SIZE / 2,
    width: SWAP_BUTTON_SIZE,
    height: SWAP_BUTTON_SIZE,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
}));

export const SWAP_ICON_SIZE = 18;
