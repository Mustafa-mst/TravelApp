import { Image, ImageBackground, type ImageSource } from "expo-image";
import { memo } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Text } from "@shared/components";
import { colors, spacing } from "@shared/styles";
import { styles } from "./DestinationCard.styles";
import { PlusIcon } from "@/shared/assets/icons";

const CARDS_PER_SCREEN = 1.1;

export type DestinationCardProps = {
  title: string;
  location: string;
  image: ImageSource | string;
  onPress?: () => void;
  onNewItinerary?: () => void;
};

function DestinationCardComponent({
  title,
  location,
  image,
  onPress,
  onNewItinerary,
}: DestinationCardProps) {
  const { t } = useTranslation();
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
      <ImageBackground source={image} style={styles.image} contentFit="cover">
        <View style={styles.blur}>
          <View style={styles.footer}>
            <View style={styles.footerTexts}>
              <Text
                variant="bodyMedium"
                color="textLight"
                numberOfLines={1}
                style={styles.title}
              >
                {title}
              </Text>
              <Text
                variant="h4"
                color="white"
                numberOfLines={1}
                style={styles.location}
              >
                {location}
              </Text>
            </View>
            <Pressable
              style={styles.newItineraryButton}
              onPress={onNewItinerary}
            >
              <PlusIcon width={16} height={16} color={colors.white} />
              <Text variant="bodyMedium" color="white" numberOfLines={1}>
                {t("home.newItinerary")}
              </Text>
            </Pressable>
          </View>
          <Image
            source={image}
            style={{ width: "100%", aspectRatio: 100 / 40, borderRadius: 12 }}
          />
        </View>
      </ImageBackground>
    </Pressable>
  );
}

export const DestinationCard = memo(DestinationCardComponent);
