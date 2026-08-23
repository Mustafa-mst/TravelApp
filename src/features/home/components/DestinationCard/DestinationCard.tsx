import { Image, type ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { memo } from "react";
import { useWindowDimensions, View } from "react-native";

import { PressableScale, Text } from "@shared/components";
import { useStyles } from "@shared/hooks";
import { spacing } from "@shared/styles";
import {
  DESTINATION_SCRIM_COLORS,
  destinationCardStyles,
} from "./DestinationCard.styles";

const CARDS_PER_SCREEN = 1.8;

export type DestinationCardProps = {
  title: string;
  location: string;
  image: ImageSource | string;
  onPress?: () => void;
};

function DestinationCardComponent({
  title,
  location,
  image,
  onPress,
}: DestinationCardProps) {
  const styles = useStyles(destinationCardStyles);
  const { width } = useWindowDimensions();
  const cardWidth =
    (width - spacing.md * 2 - spacing.md * (CARDS_PER_SCREEN - 1)) /
    CARDS_PER_SCREEN;

  return (
    <PressableScale
      containerStyle={[styles.shadow, { width: cardWidth }]}
      style={styles.card}
      onPress={onPress}
    >
      <Image source={image} style={styles.image} contentFit="cover" />

      <LinearGradient
        colors={DESTINATION_SCRIM_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      />

      <View style={styles.body}>
        <Text variant="h5" color="staticWhite" numberOfLines={2} style={styles.title}>
          {location}
        </Text>
        <Text
          variant="caption"
          color="staticWhite"
          numberOfLines={2}
          style={styles.subtitle}
        >
          {title}
        </Text>
      </View>
    </PressableScale>
  );
}

export const DestinationCard = memo(DestinationCardComponent);
