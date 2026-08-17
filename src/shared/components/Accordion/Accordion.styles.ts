import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const CONTENT_SPRING = {
  damping: 20,
  stiffness: 180,
  mass: 0.6,
};

export const INDICATOR_ROTATION: [number, number] = [0, -180];

export const CHEVRON_SIZE = 18;
export const LEADING_ICON_SIZE = 18;

export const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  containerSurface: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + spacing.xs,
    paddingVertical: spacing.md,
  },
  triggerSurface: {
    paddingHorizontal: spacing.md,
  },
  info: {
    flex: 1,
  },
  subtitle: {
    marginTop: spacing.xs / 2,
  },
  contentWrapper: {
    overflow: "hidden",
  },
  contentMeasure: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  contentInner: {
    paddingBottom: spacing.md,
  },
  contentInnerSurface: {
    paddingHorizontal: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  separatorSurface: {
    marginHorizontal: spacing.md,
  },
  disabled: {
    opacity: 0.5,
  },
});
