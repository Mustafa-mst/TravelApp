import { spacing, themed } from "@shared/styles";

const AMOUNT_FONT_SIZE = 24;

export const converterRowStyles = themed(({ colors }) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  fields: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  amountInput: {
    fontSize: AMOUNT_FONT_SIZE,
    fontWeight: "700",
    color: colors.fieldForeground,
    padding: 0,
  },
}));
