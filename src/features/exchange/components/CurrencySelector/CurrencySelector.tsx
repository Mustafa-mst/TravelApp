import { memo } from "react";
import { View } from "react-native";

import {
  Divider,
  PressableScale,
  RemoteImage,
  Text,
} from "@shared/components";
import { useStyles } from "@shared/hooks";
import { currencySelectorStyles } from "./CurrencySelector.styles";

const CURRENCY_PLACEHOLDER = "—";
const DIVIDER_MARGIN = 0;

export type CurrencySelectorProps = {
  flagUri?: string;
  code?: string;
  onPress: () => void;
};

function CurrencySelectorComponent({
  flagUri,
  code,
  onPress,
}: CurrencySelectorProps) {
  const styles = useStyles(currencySelectorStyles);

  return (
    <View style={styles.row}>
      <PressableScale style={styles.selector} onPress={onPress} hitSlop={12}>
        {flagUri ? (
          <RemoteImage source={flagUri} style={styles.flag} />
        ) : (
          <View style={styles.flagPlaceholder} />
        )}
        <Text variant="bodyMedium" numberOfLines={1}>
          {code ?? CURRENCY_PLACEHOLDER}
        </Text>
      </PressableScale>
      <Divider
        orientation="vertical"
        margin={DIVIDER_MARGIN}
        style={styles.divider}
      />
    </View>
  );
}

export const CurrencySelector = memo(CurrencySelectorComponent);
