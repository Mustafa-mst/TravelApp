import { View } from "react-native";
import { BottomSheetFlatList } from "@expo/ui/community/bottom-sheet";
import { Image } from "expo-image";
import { memo, useCallback } from "react";
import { PressableScale, Text } from "@/shared/components";
import { DropdownItem } from "@/shared/types";
import { styles } from "./ExchangeSheetList.styles";
import { ExchangeRate } from "../../types";
import { CheckboxCheckedIcon } from "@/shared/assets/icons";
import { colors } from "@/shared/styles";

type ExchangeListProps = {
  data?: ExchangeRate[];
  onSelectItem: (item: DropdownItem) => void;
  selectedItem?: DropdownItem;
};

function ExchangeSheetListComponent({
  data,
  onSelectItem,
  selectedItem,
}: ExchangeListProps) {
  // Rows render straight from the rate records; building React elements inside
  // the data (icons as "data") would defeat FlatList recycling.
  const renderRow = useCallback(
    ({ item, index }: { item: ExchangeRate; index: number }) => (
      <PressableScale
        style={[styles.option, index > 0 && styles.optionDivider]}
        onPress={() => onSelectItem({ label: item.currency_code })}
      >
        <View style={styles.optionText}>
          {item.flag ? (
            <Image source={item.flag} style={styles.flag} contentFit="cover" />
          ) : null}
          <Text variant="bodyMedium">{item.currency_code}</Text>
        </View>
        {item.currency_code === selectedItem?.label ? (
          <CheckboxCheckedIcon width={18} height={18} color={colors.primary} />
        ) : null}
      </PressableScale>
    ),
    [onSelectItem, selectedItem?.label],
  );

  return (
    <View style={styles.card}>
      <BottomSheetFlatList
        data={data}
        style={styles.list}
        keyExtractor={(item) => item.currency_code}
        contentContainerStyle={styles.options}
        renderItem={renderRow}
        initialNumToRender={12}
        windowSize={7}
        removeClippedSubviews
      />
    </View>
  );
}

export const ExchangeSheetList = memo(ExchangeSheetListComponent);
