import { memo } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@shared/styles";
import { RemoteImage } from "../RemoteImage";
import { Text } from "../Text";
import { styles } from "./MapPlaceCard.styles";
import type { MapMarkerBadge } from "./map.types";

export type MapPlaceCardProps = {
  imageUrl?: string | null;
  title?: string;
  badge?: MapMarkerBadge;
};

function MapPlaceCardComponent({ imageUrl, title, badge }: MapPlaceCardProps) {
  return (
    <View style={styles.card}>
      {imageUrl ? (
        <RemoteImage source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imageFallback]}>
          <MaterialIcons
            name={badge?.icon ?? "place"}
            size={20}
            color={colors.iconTertiary}
          />
        </View>
      )}

      {title ? (
        <Text variant="captionMedium" numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      ) : null}
    </View>
  );
}

export const MapPlaceCard = memo(MapPlaceCardComponent);
