import {
  radius,
  spacing,
  themed,
  themedValue,
  type ColorToken,
} from "@shared/styles";

import type { TabsVariant } from "./tabs.types";

export const tabsStyles = themed(({ colors }) => ({
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
    backgroundColor: colors.surface,
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
    backgroundColor: colors.accent,
  },

  separator: {
    width: 1,
    alignSelf: "stretch",
    marginVertical: spacing.sm,
    backgroundColor: colors.border,
  },
}));

type TabsPalette = {
  list: object;
  trigger: object;
  indicator: object;
  label: ColorToken;
  labelActive: ColorToken;
};

export const tabsVariants = themedValue<Record<TabsVariant, TabsPalette>>(
  ({ name }) => {
    const styles = tabsStyles[name];

    return {
      primary: {
        list: styles.primaryList,
        trigger: styles.primaryTrigger,
        indicator: styles.primaryIndicator,
        label: "muted",
        labelActive: "foreground",
      },
      secondary: {
        list: styles.secondaryList,
        trigger: styles.secondaryTrigger,
        indicator: styles.secondaryIndicator,
        label: "muted",
        labelActive: "foreground",
      },
    };
  },
);
