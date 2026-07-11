import { Image, type ImageSource } from "expo-image";
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";

import { Text } from "@shared/components";
import { styles } from "./PosterCard.styles";

export type PosterCardProps = {
  title: string;
  image: ImageSource | string;
  onPress?: () => void;
};

function PosterCardComponent({ title, image, onPress }: PosterCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={image}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <Text variant="bodyMedium" color="white" style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
}

export const PosterCard = memo(PosterCardComponent);
