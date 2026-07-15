import { memo } from "react";
import { Pressable, View } from "react-native";
import { Image } from "expo-image";

import { Text } from "@shared/components";
import { colors } from "@shared/styles";
import { ChevronDownIcon } from "@/shared/assets/icons";
import { styles } from "./CurrencySelector.styles";

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
      <ChevronDownIcon width={14} height={14} color={colors.iconSecondary} />
    </Pressable>
  );
}

export const CurrencySelector = memo(CurrencySelectorComponent);
