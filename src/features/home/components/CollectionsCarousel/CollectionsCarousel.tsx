import { memo, useCallback } from "react";
import { View } from "react-native";
import { ImageBackground } from "expo-image";
import { Button, Carousel, Text } from "@shared/components";
import { BLUR_HASH } from "@shared/constants";
import type { CollectionsType } from "../../types";
import { styles } from "./CollectionsCarousel.styles";
import { spacesToNewLines } from "@shared/utils/text";

type CollectionsCarouselProps = {
  collections: CollectionsType[];
  interval?: number;
};

function CollectionsCarouselComponent({
  collections,
  interval = 3000,
}: CollectionsCarouselProps) {
  const renderItem = useCallback(
    (item: CollectionsType) => (
      <ImageBackground
        source={{ uri: item.banner_image ?? "" }}
        placeholder={{ blurhash: BLUR_HASH }}
        style={styles.image}
        contentFit="cover"
      >
        <View style={styles.content}>
          <View style={styles.title}>
            {item.title ? (
              <Text variant="display" color="white">
                {spacesToNewLines(item.title)}
              </Text>
            ) : null}
            {item.subtitle ? (
              <Text variant="body" color="white">
                {item.subtitle}
              </Text>
            ) : null}
          </View>
          {item.cta_text ? (
            <Button type="secondary" label={item.cta_text} />
          ) : null}
        </View>
      </ImageBackground>
    ),
    [],
  );

  return (
    <Carousel
      data={collections}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      interval={interval}
    />
  );
}

export const CollectionsCarousel = memo(CollectionsCarouselComponent);
