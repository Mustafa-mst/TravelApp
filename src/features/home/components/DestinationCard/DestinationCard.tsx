import { Image, type ImageSource } from "expo-image";
import { memo } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";

import { Text } from "@shared/components";
import { spacing } from "@shared/styles";
import { styles } from "./DestinationCard.styles";

const CARDS_PER_SCREEN = 1.1;

export type DestinationCardProps = {
  title: string;
  location: string;
  image: ImageSource | string;
  category?: string;
  onPress?: () => void;
};

function DestinationCardComponent({
  title,
  location,
  image,
  category,
  onPress,
}: DestinationCardProps) {
  const { width } = useWindowDimensions();
  const cardWidth =
    (width - spacing.md * 2 - spacing.md * (CARDS_PER_SCREEN - 1)) /
    CARDS_PER_SCREEN;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { width: cardWidth },
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Image source={image} style={styles.image} contentFit="cover" />
        {category ? (
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text variant="caption" color="white" numberOfLines={1}>
              {category}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text variant="h6" color="text" numberOfLines={2}>
          {title}
        </Text>
        <Text variant="bodyMedium" color="primary" numberOfLines={1}>
          {location}
        </Text>
      </View>
    </Pressable>
  );
}

export const DestinationCard = memo(DestinationCardComponent);
