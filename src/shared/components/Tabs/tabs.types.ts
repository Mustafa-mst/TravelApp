import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

export type TabsVariant = "primary" | "secondary";

export type TabsScrollAlign = "start" | "center" | "end" | "none";

export type TabOption<T extends string = string> = {
  key: T;
  label: string;
  Icon?: ComponentType<SvgProps>;
  disabled?: boolean;
};
