import { Image, type ImageSource } from "expo-image";
import { memo } from "react";
import { Pressable, Text } from "react-native";

import { styles } from "./CategoryCard.styles";

export type CategoryCardProps = {
  image: ImageSource | number;
  title: string;
  onPress: () => void;
};

export function CategoryCardComponent({
  image,
  onPress,
  title,
}: CategoryCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} contentFit="cover" />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

export const CategoryCard = memo(CategoryCardComponent);
