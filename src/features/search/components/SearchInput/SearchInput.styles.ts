import { radius, spacing, themed } from "@shared/styles";

export const SEARCH_INPUT_ICON_SIZE = 20;

export const searchInputStyles = themed(({ colors }) => ({
  container: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  inputContainer: {
    flex: 1,
  },
  input: {
    borderRadius: radius.full,
    backgroundColor: colors.fieldBackground,
  },
}));
