import { FlatList, Pressable, View } from "react-native";
import { Image } from "expo-image";
import { memo, useMemo } from "react";
import { Text } from "@/shared/components";
import { DropdownItem } from "@/shared/types";
import { styles } from "./ExchangeSheetList.styles";
import { ExchangeRate } from "../../types";

type ExchangeListProps = {
  data?: ExchangeRate[];
  onSelectItem: (item: DropdownItem) => void;
  selectedItem?: DropdownItem;
};

const toDropdownItem = (rate: ExchangeRate): DropdownItem => ({
  label: rate.currency_code,
  icon: rate.flag ? (
    <Image source={rate.flag} style={styles.flag} contentFit="cover" />
  ) : undefined,
});

function ExchangeSheetListComponent({
  data = [],
  onSelectItem,
  selectedItem,
}: ExchangeListProps) {
  const currencies = useMemo(() => (data ?? []).map(toDropdownItem), [data]);

  return (
    <FlatList
      data={currencies}
      style={styles.list}
      keyExtractor={(item) => item.label}
      contentContainerStyle={styles.options}
      renderItem={({ item }) => {
        const isActive = item.label === selectedItem?.label;
        return (
          <Pressable style={styles.option} onPress={() => onSelectItem(item)}>
            <View style={styles.optionText}>
              {item.icon}
              <Text variant="bodyMedium">{item.label}</Text>
            </View>
            {isActive ? <Text variant="bodyMedium">✓</Text> : null}
          </Pressable>
        );
      }}
    />
  );
}

export const ExchangeSheetList = memo(ExchangeSheetListComponent);
