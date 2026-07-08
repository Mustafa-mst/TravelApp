import { StyleSheet } from "react-native";
import { colors } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 4,
    padding: 12,
    backgroundColor: '#0D4D43',
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#FFCC00",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
    gap: 8,
  },
  iconBadge: {
    backgroundColor: "#FFCC00",
    borderRadius: 2,
    padding: 2,
  },
  label: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },
});
