import { spacing, themed } from "@shared/styles";

const HERO_HEIGHT = 280;

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
  scrollContent: {
    paddingBottom: spacing.xxl,
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
  },
  titleBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  body: {
    padding: spacing.md,
    gap: spacing.lg,
  },
}));
