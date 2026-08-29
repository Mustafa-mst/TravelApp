import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { useStyles } from "@shared/hooks";
import { SearchIcon } from "@shared/assets/icons";
import { TextField } from "../TextField";
import { selectStyles } from "./Select.styles";

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
  const styles = useStyles(selectStyles);

  return (
    <View style={styles.searchField}>
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
    </View>
  );
}

export const SelectSearchField = memo(SelectSearchFieldComponent);
