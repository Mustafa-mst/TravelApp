import type { ParseKeys } from "i18next";
import i18n from "@shared/i18n";
import type { OptionItemType, OptionsType } from "@shared/types";

/**
 * The options as a list in declaration order, each key folded back in as
 * `value`. The cast is sound because `OptionsType<T>` only admits `T` as a
 * key; `Object.entries` just widens it to `string`.
 */
export function getOptionList<T extends string>(
  options: OptionsType<T>,
): OptionItemType<T>[] {
  return Object.entries<Omit<OptionItemType<T>, "value">>(options).map(
    ([value, option]) => ({ ...option, value: value as T }),
  );
}

/** Falls back to `fallbackKey` when nothing is selected — "All continents". */
export function getSelectedOptionLabel<T extends string>(
  options: OptionsType<T>,
  selected: T | null | undefined,
  fallbackKey: ParseKeys,
): string {
  return i18n.t(selected ? options[selected].labelKey : fallbackKey);
}
