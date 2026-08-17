import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

export type StateViewContent = {
  label?: string;
  hint?: string;
  Icon?: ComponentType<SvgProps>;
  onRetry?: () => void;
  retryLabel?: string;
};
