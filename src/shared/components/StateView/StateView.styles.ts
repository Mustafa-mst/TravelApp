import { radius, spacing, themed } from "@shared/styles";

export const stateViewStyles = themed(() => ({
  block: {
    paddingVertical: spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  badge: {
    width: 50,
    height: 50,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  hint: {
    marginTop: spacing.xs,
  },
  action: {
    marginTop: spacing.lg,
  },
}));
