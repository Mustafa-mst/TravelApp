import { spacing, themed, type TypographyVariant } from "@shared/styles";
import type { SheetHeaderVariant } from "./sheetHeader.types";

export const sheetHeaderStyles = themed(() => ({
  header: {
    gap: spacing.md,
  },
  stackedActions: {
    alignItems: "flex-start",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  inlineTitle: {
    flexShrink: 1,
  },
}));

export const sheetHeaderTitleVariants: Record<
  SheetHeaderVariant,
  TypographyVariant
> = {
  stacked: "h3",
  inline: "bodyExtraLargeMedium",
};
