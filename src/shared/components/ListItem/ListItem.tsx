import { Image, type ImageSource } from "expo-image";
import { memo } from "react";
import { Pressable, View } from "react-native";

import { ChevronRightIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import { Text } from "../Text";
import { styles } from "./ListItem.styles";

export type ListItemProps = {
  title: string;
  subtitle?: string;
  image: ImageSource | string;
  /** Corner radius for the leading image. Defaults to a fully rounded avatar. */
  imageRadius?: number;
  onPress?: () => void;
};

function ListItemComponent({
  title,
  subtitle,
  image,
  imageRadius = 8,
  onPress,
}: ListItemProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={image}
        style={[styles.image, { borderRadius: imageRadius }]}
        contentFit="cover"
      />
      <View style={styles.info}>
        <Text variant="bodyMedium" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="body" numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <ChevronRightIcon width={18} height={18} color={colors.iconTertiary} />
    </Pressable>
  );
}

export const ListItem = memo(ListItemComponent);
