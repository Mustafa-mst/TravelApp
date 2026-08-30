import { memo } from "react";
import { useTranslation } from "react-i18next";

import { SearchIcon } from "@shared/assets/icons";
import { TextField } from "../TextField";

export type SelectSearchFieldProps = {
  value: string;
  onChangeText: (query: string) => void;
  placeholder?: string;
  /** Sheets bring their own keyboard handling; the popover input needs none. */
  autoFocus?: boolean;
};

function SelectSearchFieldComponent({
  value,
  onChangeText,
  placeholder,
  autoFocus = false,
}: SelectSearchFieldProps) {
  const { t } = useTranslation();

  return (
    <TextField
      variant="secondary"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder ?? t("common.search")}
      startIcon={SearchIcon}
      autoFocus={autoFocus}
      autoCapitalize="none"
      autoCorrect={false}
      clearable
      returnKeyType="search"
    />
  );
}

export const SelectSearchField = memo(SelectSearchFieldComponent);
