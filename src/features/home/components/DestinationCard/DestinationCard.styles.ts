import { StyleSheet } from "react-native";
import { colors, radius, shadows, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  shadow: {
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    ...shadows.level3,
  },
  card: {
    aspectRatio: 1.5,
    borderRadius: radius.lg,
    overflow: "hidden",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: colors.white,
  },
  image: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
  favorite: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
  body: {
    padding: spacing.md,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    maxWidth: "70%",
    gap: 2,
  },
  title: {
    textAlign: "right",
  },
  subtitle: {
    opacity: 0.9,
    textAlign: "right",
  },
});
