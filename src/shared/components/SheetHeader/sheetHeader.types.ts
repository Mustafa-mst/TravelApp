import type { ReactNode } from "react";

export type SheetHeaderVariant = "stacked" | "inline";

export type SheetHeaderProps = {
  title: string;
  onClose: () => void;
  variant?: SheetHeaderVariant;
  children?: ReactNode;
};
