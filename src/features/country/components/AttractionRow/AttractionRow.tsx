import { memo } from "react";
import { View } from "react-native";

import { ChevronRightIcon } from "@shared/assets/icons";
import { PressableScale, RemoteImage, Text } from "@shared/components";
import { useStyles, useThemeColors } from "@shared/hooks";
import type { PlaceType } from "@/features/places";
import {
  CHEVRON_SIZE,
  attractionRowStyles,
} from "./AttractionRow.styles";

export type AttractionRowProps = {
  place: PlaceType;
  rank: number;
  onPress: (place: PlaceType) => void;
};

function AttractionRowComponent({ place, rank, onPress }: AttractionRowProps) {
  const styles = useStyles(attractionRowStyles);
  const colors = useThemeColors();

  return (
    <PressableScale
      style={styles.root}
      accessibilityRole="button"
      onPress={() => onPress(place)}
    >
      {place.imageUrl ? (
        <RemoteImage source={place.imageUrl} style={styles.image} />
      ) : (
        <View style={styles.image} />
      )}

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text variant="bodyLargeMedium" numberOfLines={2} style={styles.title}>
            {`${rank}. ${place.name}`}
          </Text>
          <ChevronRightIcon
            width={CHEVRON_SIZE}
            height={CHEVRON_SIZE}
            color={colors.muted}
          />
        </View>

        {place.rating != null ? (
          <View style={styles.ratingRow}>
            <Text variant="captionMedium">{`★ ${place.rating.toFixed(1)}`}</Text>
            {place.userRatingCount != null ? (
              <Text variant="caption" color="muted">
                {`(${place.userRatingCount.toLocaleString()})`}
              </Text>
            ) : null}
          </View>
        ) : null}

        {place.address ? (
          <Text variant="caption" color="muted" numberOfLines={1}>
            {place.address}
          </Text>
        ) : null}
      </View>
    </PressableScale>
  );
}

export const AttractionRow = memo(AttractionRowComponent);
