import { View } from "react-native";
import { Image } from "expo-image";
import { memo, useCallback } from "react";
import { BottomSheetList, PressableScale, Text } from "@shared/components";
import { useStyles, useThemeColors } from "@shared/hooks";
import { DropdownItem } from "@shared/types";
import {
  CHECKBOX_ICON_SIZE,
  exchangeSheetListStyles,
} from "./ExchangeSheetList.styles";
import { ExchangeRate } from "../../types";
import { CheckboxCheckedIcon } from "@/shared/assets/icons";

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
  const styles = useStyles(exchangeSheetListStyles);
  const colors = useThemeColors();

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
          <CheckboxCheckedIcon
            width={CHECKBOX_ICON_SIZE}
            height={CHECKBOX_ICON_SIZE}
            color={colors.accent}
          />
        ) : null}
      </PressableScale>
    ),
    [colors.accent, onSelectItem, selectedItem?.label, styles],
  );

  return (
    <BottomSheetList
      data={data}
      keyExtractor={(item) => item.currency_code}
      renderItem={renderRow}
    />
  );
}

export const ExchangeSheetList = memo(ExchangeSheetListComponent);
