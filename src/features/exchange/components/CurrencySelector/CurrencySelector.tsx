import { memo } from "react";
import { Pressable, View } from "react-native";
import { Image } from "expo-image";

import { Text } from "@shared/components";
import { useStyles, useThemeColors } from "@shared/hooks";
import { ChevronDownIcon } from "@/shared/assets/icons";
import {
  CHEVRON_ICON_SIZE,
  currencySelectorStyles,
} from "./CurrencySelector.styles";

type CurrencySelectorProps = {
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
  const colors = useThemeColors();

  return (
    <Pressable style={styles.selector} onPress={onPress}>
      {flagUri ? (
        <Image source={flagUri} style={styles.flag} contentFit="cover" />
      ) : (
        <View style={styles.flagPlaceholder} />
      )}
      <Text variant="bodyLargeMedium" numberOfLines={1} style={styles.code}>
        {code ?? "—"}
      </Text>
      <ChevronDownIcon
        width={CHEVRON_ICON_SIZE}
        height={CHEVRON_ICON_SIZE}
        color={colors.muted}
      />
    </Pressable>
  );
}

export const CurrencySelector = memo(CurrencySelectorComponent);
