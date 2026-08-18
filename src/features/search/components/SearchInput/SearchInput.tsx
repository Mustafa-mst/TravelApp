import React from "react";
import { useTranslation } from "react-i18next";
import { styles } from "./SearchInput.styles";
import { IconButton, TextField } from "@shared/components";
import { ArrowLeftIcon, FilterIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import { View } from "react-native";

type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  onGoBack?: () => void;
  onOpenFilters?: () => void;
  /** Highlights the filter button while a filter is applied. */
  isFilterActive?: boolean;
};

const SearchInputComponent = ({
  value,
  onChangeText,
  onGoBack,
  onOpenFilters,
  isFilterActive = false,
}: SearchInputProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TextField
        autoFocus
        clearable
        startIcon={ArrowLeftIcon}
        onStartContentPress={onGoBack}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
        containerStyle={styles.inputContainer}
        fieldStyle={styles.input}
        placeholder={t("search.placeholder")}
      />
      <IconButton
        rounded
        onPress={onOpenFilters}
        accessibilityLabel={t("search.filters")}
        icon={
          <FilterIcon
            width={20}
            height={20}
            color={isFilterActive ? colors.primary : colors.iconPrimary}
          />
        }
      />
    </View>
  );
};

export const SearchInput = React.memo(SearchInputComponent);
