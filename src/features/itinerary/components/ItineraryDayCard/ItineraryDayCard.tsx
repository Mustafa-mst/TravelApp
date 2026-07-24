import { memo } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";

import { PressableScale, Text } from "@shared/components";
import { BLUR_HASH } from "@shared/constants";
import { PLACE_TYPE_META } from "@/features/places/constants";
import type { ItineraryDayWithItems } from "../../types";
import { styles } from "./ItineraryDayCard.styles";

export type ItineraryDayCardProps = {
  day: ItineraryDayWithItems;
  isActive: boolean;
  onPress?: () => void;
};

function DayBadge({
  dayNumber,
  isActive,
}: {
  dayNumber: number;
  isActive: boolean;
}) {
  const { t } = useTranslation();
  return (
    <View style={[styles.badge, isActive && styles.badgeActive]}>
      <Text variant="captionMedium" color="textSecondary">
        {t("itinerary.detail.dayLabel", { day: dayNumber })}
      </Text>
    </View>
  );
}

function ItineraryDayCardComponent({
  day,
  isActive,
  onPress,
}: ItineraryDayCardProps) {
  const { t } = useTranslation();

  const firstItem = day.items[0];

  if (!firstItem) {
    return (
      <PressableScale
        onPress={onPress}
        style={[styles.card, styles.emptyCard]}
        containerStyle={styles.flex}
      >
        <DayBadge dayNumber={day.day_number} isActive={isActive} />
        <View style={styles.emptyBody}>
          <Text style={styles.emptyIcon}>🗺️</Text>
          <View style={styles.emptyText}>
            <Text variant="bodyMedium">
              {t("itinerary.detail.dayEmptyTitle")}
            </Text>
            <Text variant="caption" color="textMuted">
              {t("itinerary.detail.dayEmptyAction")}
            </Text>
          </View>
        </View>
      </PressableScale>
    );
  }

  // Unique place-type chips across the day's items (keeps first-seen order).
  const typeChips = Array.from(
    new Set(day.items.map((item) => item.place_type)),
  ).map((type) => ({ type, ...PLACE_TYPE_META[type] }));

  return (
    <PressableScale
      onPress={onPress}
      style={styles.card}
      containerStyle={styles.flex}
    >
      <View style={styles.info}>
        <DayBadge dayNumber={day.day_number} isActive={isActive} />

        <Text variant="bodyLargeSemiBold" numberOfLines={1}>
          {firstItem.name}
        </Text>
        {Boolean(firstItem.description) && (
          <Text variant="caption" color="textMuted" numberOfLines={1}>
            {firstItem.description}
          </Text>
        )}

        {typeChips.length > 0 && (
          <View style={styles.chips}>
            {typeChips.map((chip) => (
              <View key={chip.type} style={styles.chip}>
                <Text variant="captionMedium" color="textSecondary">
                  {`${chip.icon} ${chip.label}`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {Boolean(firstItem.image_url) && (
        <View style={styles.photoColumn}>
          <Image
            source={{ uri: firstItem.image_url! }}
            placeholder={{ blurhash: BLUR_HASH }}
            transition={300}
            style={styles.photo}
            contentFit="cover"
          />
        </View>
      )}
    </PressableScale>
  );
}

export const ItineraryDayCard = memo(ItineraryDayCardComponent);
