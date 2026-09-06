import { spacing, themed } from "@shared/styles";

const HERO_HEIGHT = 280;
const FOOTER_FADE_HEIGHT = 40;

export const countryDetailScreenStyles = themed(({ colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  hero: {
    width: "100%",
    height: HERO_HEIGHT,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  // Takes the slack so the clock stays pinned to the right edge.
  titleBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  body: {
    paddingVertical: spacing.md,
    gap: spacing.lg,
  },
  listCard: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
  },
  // Floats over the list so the rows stay faintly visible behind the button.
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  // Reaches above the footer so the rows dissolve instead of being cut off,
  // and stays short of opaque so they read faintly behind the button.
  footerFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: -FOOTER_FADE_HEIGHT,
    opacity: 0.9,
  },
}));
