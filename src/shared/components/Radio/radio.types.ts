export type RadioVariant = "primary" | "secondary";

export type RadioGroupOrientation = "vertical" | "horizontal";

export type RadioIndicatorPosition = "start" | "end";

export type RadioOption<T extends string = string> = {
  key: T;
  label: string;
  description?: string;
  disabled?: boolean;
};
