import { memo, useMemo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { StateView, Text, TimelineRail } from "@shared/components";
import { colors } from "@shared/styles";
import type { TripDetailDay } from "../../types";
import { TripDayCard } from "../TripDayCard";
import { styles } from "./TripDetailOverview.styles";

export type TripDetailOverviewProps = {
  days: TripDetailDay[];
  activeDayNumber: number;
  isLoading: boolean;
  isError: boolean;
  canEdit: boolean;
  onRetry: () => void;
  onAddItem?: (dayId: string) => void;
  onOpenDay?: (dayId: string) => void;
};

function TripDetailOverviewComponent({
  days,
  activeDayNumber,
  isLoading,
  isError,
  canEdit,
  onRetry,
  onAddItem,
  onOpenDay,
}: TripDetailOverviewProps) {
  const { t } = useTranslation();

  const visibleDays = useMemo(
    () => (canEdit ? days : days.filter((day) => day.items.length > 0)),
    [canEdit, days],
  );

  if (isLoading || isError) {
    return (
      <StateView
        isLoading={isLoading}
        isError={isError}
        errorLabel={t("template.detail.loadError")}
        retryLabel={t("template.save")}
        onRetry={onRetry}
      />
    );
  }

  return (
    <View style={styles.content}>
      <Text variant="bodyLargeSemiBold">{t("template.detail.planTitle")}</Text>
      {visibleDays.map((day, index) => {
        const isActive = day.day_number === activeDayNumber;
        const isLast = index === visibleDays.length - 1;
        const handler = day.items.length === 0 ? onAddItem : onOpenDay;

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

            <TripDayCard
              day={day}
              isActive={isActive}
              onPress={handler ? () => handler(day.id) : undefined}
            />
          </View>
        );
      })}
    </View>
  );
}

export const TripDetailOverview = memo(TripDetailOverviewComponent);
