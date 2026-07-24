import { memo } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  IconButton,
  PressableScale,
  Text,
  TimelineRail,
} from "@shared/components";
import { MoreVerticalIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import { PLACE_TYPE_META } from "@/features/places/constants";
import type { ItineraryItem } from "../../types";
import { styles } from "./DayTimelineCard.styles";

export type DayTimelineCardProps = {
  item: ItineraryItem;
  /** First row in the day: draws the small cap above the badge. */
  isFirst?: boolean;
  /** Last row in the day: stops the connector line at this badge. */
  isLast?: boolean;
  onPress?: () => void;
  onMore?: () => void;
};

/** Formats a "HH:MM:SS" time column down to "HH:MM". */
function formatTime(time: string | null): string | null {
  if (!time) {
    return null;
  }
  return time.slice(0, 5);
}

function DayTimelineCardComponent({
  item,
  isFirst = false,
  isLast = false,
  onPress,
  onMore,
}: DayTimelineCardProps) {
  const startsAt = formatTime(item.starts_at);
  const meta = [startsAt, item.address].filter(Boolean).join("  ·  ");
  const category = PLACE_TYPE_META[item.place_type];

  return (
    <View style={styles.row}>
      <TimelineRail
        isFirst={isFirst}
        isLast={isLast}
        ring
        nodeColor={category?.color ?? colors.primary}
        elevated
      >
        <MaterialIcons
          name={category?.materialIcon ?? "place"}
          size={14}
          color={colors.white}
        />
      </TimelineRail>

      <PressableScale
        containerStyle={styles.cardContainer}
        style={styles.card}
        onPress={onPress}
        disabled={!onPress}
      >
        <View style={styles.info}>
          <Text variant="bodyMedium" numberOfLines={1}>
            {item.name}
          </Text>
          {meta ? (
            <Text variant="caption" style={styles.meta} numberOfLines={1}>
              {meta}
            </Text>
          ) : null}
        </View>
        {onMore ? (
          <IconButton
            hitSlop={8}
            style={styles.moreButton}
            onPress={onMore}
            icon={
              <MoreVerticalIcon
                width={18}
                height={18}
                color={colors.iconTertiary}
              />
            }
          />
        ) : null}
      </PressableScale>
    </View>
  );
}

export const DayTimelineCard = memo(DayTimelineCardComponent);
