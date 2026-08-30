import { memo } from "react";
import { View } from "react-native";

import { PressableScale, RemoteImage, Text } from "@shared/components";
import { CheckIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import type { ExchangeRate } from "../../types";
import { currencyListRowStyles } from "./CurrencyListRow.styles";

export type CurrencyListRowProps = {
  rate: ExchangeRate;
  isSelected: boolean;
  onPress: (code: string) => void;
};

function CurrencyListRowComponent({
  rate,
  isSelected,
  onPress,
}: CurrencyListRowProps) {
  const styles = useStyles(currencyListRowStyles);
  const colors = useThemeColors();

  return (
    <PressableScale
      style={styles.row}
      onPress={() => onPress(rate.currency_code)}
    >
      {rate.flag ? (
        <RemoteImage source={rate.flag} style={styles.flag} />
      ) : (
        <View style={styles.flag} />
      )}
      <View style={styles.info}>
        <Text variant="bodyLargeMedium">{rate.currency_code}</Text>
        {rate.name ? (
          <Text variant="body" color="muted" numberOfLines={1}>
            {rate.name}
          </Text>
        ) : null}
      </View>
      {isSelected ? (
        <CheckIcon width={20} height={20} color={colors.accent} />
      ) : null}
    </PressableScale>
  );
}

export const CurrencyListRow = memo(CurrencyListRowComponent);
