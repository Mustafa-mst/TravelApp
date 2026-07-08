import { ImageBackground, type ImageSource } from "expo-image";
import { memo } from "react";
import { Pressable, View } from "react-native";

import { Text } from "@shared/components";
import { styles } from "./CountryPreviewCard.styles";

export type CountryPreviewCardProps = {
  text: string;
  image: ImageSource | string;
  countryId: string;
  onPress?: (countryId: string) => void;
};

function CountryPreviewCardComponent({
  text,
  image,
  countryId,
  onPress,
}: CountryPreviewCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onPress?.(countryId)}>
      <ImageBackground source={image} style={styles.image} contentFit="cover">
        <View style={styles.overlay} pointerEvents="none" />
        <Text variant="bodyMedium" color="white" style={styles.title}>
          {text}
        </Text>
      </ImageBackground>
    </Pressable>
  );
}

export const CountryPreviewCard = memo(CountryPreviewCardComponent);
