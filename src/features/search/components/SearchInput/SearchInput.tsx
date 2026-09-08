import React from "react";
import { useTranslation } from "react-i18next";
import { searchInputStyles } from "./SearchInput.styles";
import { IconButton, TextField } from "@shared/components";
import { FilterIcon, SearchIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";

type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  onOpenFilters?: () => void;
  isFilterActive?: boolean;
};

const SearchInputComponent = ({
  value,
  onChangeText,
  onOpenFilters,
  isFilterActive = false,
}: SearchInputProps) => {
  const { t } = useTranslation();
  const styles = useStyles(searchInputStyles);
  const colors = useThemeColors();

  return (
    <TextField
      autoFocus
      startIcon={SearchIcon}
      value={value}
      onChangeText={onChangeText}
      returnKeyType="search"
      autoCorrect={false}
      placeholder={t("search.placeholder")}
      endContent={
        <IconButton
          onPress={onOpenFilters}
          hitSlop={8}
          style={styles.filterButton}
          accessibilityLabel={t("search.filters")}
          icon={
            <FilterIcon
              width={16}
              height={16}
              color={isFilterActive ? colors.accent : colors.muted}
            />
          }
        />
      }
    />
  );
};

export const SearchInput = React.memo(SearchInputComponent);
