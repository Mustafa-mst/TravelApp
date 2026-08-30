import { themed, typography } from "@shared/styles";

export const converterRowStyles = themed(() => ({
  // lineHeight is dropped so the tall amount text centres in the field row.
  amountInput: {
    fontSize: typography.h4.fontSize,
    fontWeight: typography.h4.fontWeight,
    textAlign: "right",
  },
}));
