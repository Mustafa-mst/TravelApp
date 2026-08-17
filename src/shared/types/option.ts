import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import type { ParseKeys } from "i18next";

/**
 * A selectable option — filter choices, segmented controls and the like.
 * Labels are translation keys rather than finished text, so they follow a
 * language change.
 */
export type OptionItemType<T extends string> = {
  value: T;
  labelKey: ParseKeys;
  subtitleKey?: ParseKeys;
  Icon?: ComponentType<SvgProps>;
  color?: string;
  disabled?: boolean;
};

/**
 * Options keyed by their own value, so reading the selected one is a lookup
 * rather than a scan. The key *is* the value, hence the `Omit` — nothing to
 * keep in sync. `getOptionList` folds it back in for rendering.
 */
export type OptionsType<T extends string> = Record<
  T,
  Omit<OptionItemType<T>, "value">
>;
