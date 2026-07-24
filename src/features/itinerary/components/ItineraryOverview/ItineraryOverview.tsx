import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { StateView, Text, TimelineRail } from "@shared/components";
import { colors } from "@shared/styles";
import type { ItineraryDayWithItems } from "../../types";
import { ItineraryDayCard } from "../ItineraryDayCard";
import { styles } from "./ItineraryOverview.styles";

export type ItineraryOverviewProps = {
  days: ItineraryDayWithItems[];
  activeDayNumber: number;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onAddItem: (dayId: string) => void;
  onOpenDay: (dayId: string) => void;
};

function ItineraryOverviewComponent({
  days,
  activeDayNumber,
  isLoading,
  isError,
  onRetry,
  onAddItem,
  onOpenDay,
}: ItineraryOverviewProps) {
  const { t } = useTranslation();

  if (isLoading || isError) {
    return (
      <StateView
        isLoading={isLoading}
        isError={isError}
        errorLabel={t("itinerary.detail.loadError")}
        retryLabel={t("itinerary.save")}
        onRetry={onRetry}
      />
    );
  }

  return (
    <View style={styles.content}>
      <Text variant="bodyLargeSemiBold">Itinerary</Text>
      {days.map((day, index) => {
        const isActive = day.day_number === activeDayNumber;
        const isLast = index === days.length - 1;

        return (
          <View key={day.id} style={styles.row}>
            <TimelineRail
              isFirst={index === 0}
              isLast={isLast}
              size={28}
              nodeColor={isActive ? colors.primary : colors.text}
              trackColor={colors.border}
              capColor={colors.text}
            >
              <Text variant="captionBold" color="white">
                {day.day_number}
              </Text>
            </TimelineRail>

            <ItineraryDayCard
              day={day}
              isActive={isActive}
              onPress={() =>
                day.items.length === 0 ? onAddItem(day.id) : onOpenDay(day.id)
              }
            />
          </View>
        );
      })}
    </View>
  );
}

export const ItineraryOverview = memo(ItineraryOverviewComponent);
