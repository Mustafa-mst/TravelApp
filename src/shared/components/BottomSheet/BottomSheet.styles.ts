import { StyleSheet } from "react-native";
import { colors, radius } from "@shared/styles";

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.grey200,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  header: {
    backgroundColor: colors.grey200,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: 24,
    paddingBottom: 12,
  },
  indicator: {
    backgroundColor: colors.grey600,
    width: 36,
    height: 4,
    borderRadius: 99,
    position: "absolute",
    alignSelf: "center",
    top: 10,
  },
  content: {
    flexShrink: 1,
  },
  contentFill: {
    flex: 1,
  },
});
