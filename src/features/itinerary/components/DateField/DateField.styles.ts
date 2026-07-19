import { StyleSheet } from "react-native";
import { spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    padding: spacing.lg - 4,
    gap: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  rangeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateColumn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  arrow: {
    transform: [{ scaleX: -1 }],
  },
  androidDialogHost: {
    width: 0,
    height: 0,
  },
});
