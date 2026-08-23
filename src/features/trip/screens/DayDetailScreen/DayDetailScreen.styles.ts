import { radius, spacing, themed } from "@shared/styles";

const HERO_HEIGHT = 280;

export const dayDetailStyles = themed((theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  hero: {
    width: "100%",
    height: HERO_HEIGHT,
  },
  body: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg - 4,
  },
  content: {
    paddingTop: spacing.md,
    gap: spacing.md + 2,
  },
  titleBlock: {
    gap: spacing.sm,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaSeparator: {
    paddingVertical: spacing.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    letterSpacing: -0.2,
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs + 2,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md - 4,
    borderRadius: radius.full,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.level1,
    ...theme.elevatedBorder,
  },
  items: {
    paddingTop: spacing.xs,
    gap: spacing.md,
  },
}));

export const ADD_STOP_ICON_SIZE = 14;
