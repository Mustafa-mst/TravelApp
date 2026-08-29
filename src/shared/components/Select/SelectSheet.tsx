import { memo, useCallback, type ReactNode, type Ref } from "react";
import { View, type ListRenderItemInfo } from "react-native";
import { useTranslation } from "react-i18next";

import { useStyles } from "@shared/hooks";
import {
  BottomSheet,
  type BottomSheet as BottomSheetRef,
} from "../BottomSheet";
import { BottomSheetList } from "../BottomSheetList";
import { Text } from "../Text";
import { selectStyles } from "./Select.styles";
import { SelectOptionRow } from "./SelectOptionRow";
import { SelectSearchField } from "./SelectSearchField";
import type { SelectOption } from "./select.types";

type SelectSheetProps = {
  ref?: Ref<BottomSheetRef>;
  options: SelectOption[];
  listLabel?: string;
  header?: ReactNode;
  snapPoints?: (string | number)[];
  isSearchable?: boolean;
  searchValue?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  isSelected: (value: string) => boolean;
  onSelect: (option: SelectOption) => void;
  onChange: (index: number) => void;
};

const noop = () => {};

function SelectSheetComponent({
  ref,
  options,
  listLabel,
  header,
  snapPoints,
  isSearchable = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder,
  emptyMessage,
  isSelected,
  onSelect,
  onChange,
}: SelectSheetProps) {
  const { t } = useTranslation();
  const styles = useStyles(selectStyles);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<SelectOption>) => (
      <SelectOptionRow
        option={item}
        isSelected={isSelected(item.value)}
        onPress={onSelect}
      />
    ),
    [isSelected, onSelect],
  );

  const keyExtractor = useCallback((item: SelectOption) => item.value, []);

  const label = listLabel ? (
    <View style={styles.listLabel}>
      <Text variant="bodyMedium" color="muted">
        {listLabel}
      </Text>
    </View>
  ) : null;

  const empty = (
    <View style={styles.empty}>
      <Text variant="body" color="muted">
        {emptyMessage ?? t("common.noResults")}
      </Text>
    </View>
  );

  return (
    <BottomSheet
      ref={ref}
      header={header}
      snapPoints={snapPoints}
      onChange={onChange}
    >
      {/* Outside the list, so it stays put as the options scroll. */}
      {isSearchable ? (
        <SelectSearchField
          value={searchValue}
          onChangeText={onSearchChange ?? noop}
          placeholder={searchPlaceholder}
        />
      ) : null}

      {/* A virtualised list needs a bounded height, which only fixed snap
          points give it; dynamic sizing renders the rows inline instead. */}
      {snapPoints?.length ? (
        <BottomSheetList
          data={options}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={label}
          ListEmptyComponent={empty}
        />
      ) : (
        <View style={styles.sheetContent}>
          {label}
          {options.length
            ? options.map((option) => (
                <SelectOptionRow
                  key={option.value}
                  option={option}
                  isSelected={isSelected(option.value)}
                  onPress={onSelect}
                />
              ))
            : empty}
        </View>
      )}
    </BottomSheet>
  );
}

export const SelectSheet = memo(SelectSheetComponent);
