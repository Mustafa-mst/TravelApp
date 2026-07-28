import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Button, Text } from "@shared/components";
import type { TripDetailView } from "../../types";
import { styles } from "./TripActions.styles";

export type TripActionsProps = {
  detail: TripDetailView;
  onStartTrip?: () => void;
  onToggleSave?: () => void;
  onEdit?: () => void;
};

/**
 * The one part of the detail screen that differs by mode: a template offers to
 * become a trip and to be saved, while a trip shows when it runs and how far
 * along it is. Everything else renders from the shared model.
 */
function TripActionsComponent({
  detail,
  onStartTrip,
  onToggleSave,
  onEdit,
}: TripActionsProps) {
  const { t } = useTranslation();

  if (detail.mode === "template") {
    return (
      <View style={styles.row}>
        <Button
          style={styles.primary}
          label={t("itinerary.detail.startTrip")}
          onPress={onStartTrip}
          state={onStartTrip ? undefined : "disabled"}
        />
        <Button
          outlined
          type="secondary"
          label={
            detail.is_saved
              ? t("itinerary.detail.savedTemplate")
              : t("itinerary.detail.saveTemplate")
          }
          onPress={onToggleSave}
          state={onToggleSave ? undefined : "disabled"}
        />
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <View style={styles.statusBadge}>
        <Text variant="captionMedium" color="textSecondary">
          {t(`itinerary.detail.status.${detail.status}`)}
        </Text>
      </View>
      {detail.can_edit ? (
        <Button
          outlined
          type="secondary"
          label={t("itinerary.detail.edit")}
          onPress={onEdit}
          state={onEdit ? undefined : "disabled"}
        />
      ) : null}
    </View>
  );
}

export const TripActions = memo(TripActionsComponent);
