import { radius, spacing, themed } from "@shared/styles";

const MAP_ASPECT = 430 / 186;

// Clears the floating tab bar pill so the last card stays scrollable into view.
const TAB_BAR_CLEARANCE = 120;

const HERO_TITLE_SHADOW_COLOR = "rgba(0, 0, 0, 0.3)";
const HERO_TITLE_SHADOW_RADIUS = 6;
const HERO_SUBTITLE_OPACITY = 0.9;

export const homeScreenStyles = themed(({ colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.lg,
    paddingBottom: TAB_BAR_CLEARANCE,
    gap: spacing.lg,
  },
  sectionPadding: {
    paddingHorizontal: spacing.lg,
  },
  map: {
    aspectRatio: MAP_ASPECT,
    overflow: "hidden",
  },
  header: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.lg,
  },
  heroText: {
    gap: spacing.xs,
    maxWidth: "85%",
  },
  // The hero sits on a photo, so the text keeps a fixed light treatment.
  heroTitle: {
    textShadowColor: HERO_TITLE_SHADOW_COLOR,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: HERO_TITLE_SHADOW_RADIUS,
  },
  heroSubtitle: {
    color: colors.staticWhite,
    opacity: HERO_SUBTITLE_OPACITY,
  },
}));
