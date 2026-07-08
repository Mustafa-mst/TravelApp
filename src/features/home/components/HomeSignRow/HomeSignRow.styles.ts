import { StyleSheet } from "react-native";
import { colors } from "@shared/styles";

export const styles = StyleSheet.create({
  signRow: {
    paddingTop: 30,
    flexDirection: "row",
  },
  edge: {
    width: 4,
    marginVertical: 16,
    backgroundColor: colors.textLight,
  },
  signList: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 4,
    overflow: "hidden",
  },
  signItem: {
    flex: 1,
    flexDirection: "row",
  },
  signItemContent: {
    flex: 1,
  },
  divider: {
    width: 1,
    marginVertical: 12,
    backgroundColor: "#FFCC00",
  },
});
