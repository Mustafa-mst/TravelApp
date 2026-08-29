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
import { useStyles, useThemeColors } from "@shared/hooks";
import { PLACE_TYPE_META, PlaceTypes } from "@/features/places/constants";
import type { TripDetailItem } from "../../types";
import {
  dayTimelineCardStyles,
  TIMELINE_MORE_ICON_SIZE,
  TIMELINE_NODE_ICON_SIZE,
} from "./DayTimelineCard.styles";

export type DayTimelineCardProps = {
  item: TripDetailItem;
  /** First row in the day: draws the small cap above the badge. */
  isFirst?: boolean;
  /** Last row in the day: stops the connector line at this badge. */
  isLast?: boolean;
  onPress?: () => void;
  onMore?: () => void;
};

const FALLBACK_PLACE = PLACE_TYPE_META[PlaceTypes.TouristAttraction];

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
  const styles = useStyles(dayTimelineCardStyles);
  const colors = useThemeColors();

  const startsAt = formatTime(item.starts_at);
  const meta = [startsAt, item.address].filter(Boolean).join("  ·  ");
  const category = PLACE_TYPE_META[item.place_type];

  return (
    <View style={styles.row}>
      <TimelineRail
        isFirst={isFirst}
        isLast={isLast}
        ring
        nodeColor={category?.color ?? FALLBACK_PLACE.color}
        elevated
      >
        <MaterialIcons
          name={category?.materialIcon ?? "place"}
          size={TIMELINE_NODE_ICON_SIZE}
          color={colors.staticWhite}
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
            <Text variant="caption" color="muted" numberOfLines={1}>
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
                width={TIMELINE_MORE_ICON_SIZE}
                height={TIMELINE_MORE_ICON_SIZE}
                color={colors.muted}
              />
            }
          />
        ) : null}
      </PressableScale>
    </View>
  );
}

export const DayTimelineCard = memo(DayTimelineCardComponent);
