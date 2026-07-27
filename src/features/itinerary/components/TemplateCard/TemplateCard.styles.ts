import { StyleSheet } from "react-native";
import { colors, radius, shadows, spacing } from "@shared/styles";

const IMAGE_WIDTH = 135;
const IMAGE_HEIGHT = 110;

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    ...shadows.level1,
  },
  info: {
    flex: 1,
    gap: spacing.md - 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  chip: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  image: {
    width: IMAGE_WIDTH,
    aspectRatio: IMAGE_WIDTH / IMAGE_HEIGHT,
    borderRadius: radius.md,
  },
});
