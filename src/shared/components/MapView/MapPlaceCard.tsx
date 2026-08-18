import { memo } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useStyles, useThemeColors } from "@shared/hooks";
import { RemoteImage } from "../RemoteImage";
import { Text } from "../Text";
import { mapPlaceCardStyles } from "./MapPlaceCard.styles";
import type { MapMarkerBadge } from "./map.types";

export type MapPlaceCardProps = {
  imageUrl?: string | null;
  title?: string;
  badge?: MapMarkerBadge;
};

function MapPlaceCardComponent({ imageUrl, title, badge }: MapPlaceCardProps) {
  const styles = useStyles(mapPlaceCardStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.card}>
      {imageUrl ? (
        <RemoteImage source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imageFallback]}>
          <MaterialIcons
            name={badge?.icon ?? "place"}
            size={20}
            color={colors.muted}
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
