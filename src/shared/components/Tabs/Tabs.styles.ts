import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

import type { TabsVariant } from "./tabs.types";

export const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    maxWidth: "100%",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowStretch: {
    flex: 1,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs + 2,
  },
  triggerStretch: {
    flex: 1,
  },
  disabled: {
    opacity: 0.4,
  },
  indicator: {
    position: "absolute",
  },
  panel: {
    width: "100%",
  },

  primaryList: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.full,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  primaryTrigger: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
  },
  primaryIndicator: {
    backgroundColor: colors.white,
    borderRadius: radius.full,
    top: spacing.xs,
    bottom: spacing.xs,
  },

  secondaryList: {
    gap: spacing.lg,
  },
  secondaryTrigger: {
    paddingBottom: spacing.sm,
  },
  secondaryIndicator: {
    height: 3,
    bottom: 0,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },

  separator: {
    width: 1,
    alignSelf: "stretch",
    marginVertical: spacing.sm,
    backgroundColor: colors.border,
  },
});

type TabsPalette = {
  list: object;
  trigger: object;
  indicator: object;
  label: keyof typeof colors;
  labelActive: keyof typeof colors;
};

export const tabsVariants: Record<TabsVariant, TabsPalette> = {
  primary: {
    list: styles.primaryList,
    trigger: styles.primaryTrigger,
    indicator: styles.primaryIndicator,
    label: "textSecondary",
    labelActive: "textPrimary",
  },
  secondary: {
    list: styles.secondaryList,
    trigger: styles.secondaryTrigger,
    indicator: styles.secondaryIndicator,
    label: "textMuted",
    labelActive: "textPrimary",
  },
};
