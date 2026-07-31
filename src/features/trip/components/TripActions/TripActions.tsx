import { memo } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { IconButton, Text } from "@shared/components";
import { colors, spacing } from "@shared/styles";
import { BookmarkIcon, EditIcon } from "@/shared/assets/icons";
import { TripDetailMode } from "../../constants";
import type { TripDetailView } from "../../types";
import { StartActionButton } from "./StartActionButton";
import { ACTION_ICON_SIZE, styles } from "./TripActions.styles";

export type TripActionsProps = {
  detail: TripDetailView;
  canEditAction: boolean;
  onStartTrip?: () => void;
  onToggleSave?: () => void;
  onEdit?: () => void;
};

function TripActionsComponent({
  detail,
  canEditAction,
  onStartTrip,
  onToggleSave,
  onEdit,
}: TripActionsProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const paddingBottom = Math.max(insets.bottom, spacing.md);
  const isSaved = detail.mode === TripDetailMode.Template && detail.is_saved;

  const actionIcon = canEditAction ? (
    <IconButton
      style={styles.actionButton}
      accessibilityLabel={t("template.detail.edit")}
      onPress={onEdit}
      icon={
        <EditIcon
          width={ACTION_ICON_SIZE}
          height={ACTION_ICON_SIZE}
          color={colors.iconPrimary}
        />
      }
    />
  ) : (
    <IconButton
      style={styles.actionButton}
      accessibilityLabel={t(
        isSaved
          ? "template.detail.savedTemplate"
          : "template.detail.saveTemplate",
      )}
      onPress={onToggleSave}
      icon={
        <BookmarkIcon
          width={ACTION_ICON_SIZE}
          height={ACTION_ICON_SIZE}
          color={isSaved ? colors.primary : colors.iconPrimary}
        />
      }
    />
  );

  return (
    <View style={[styles.container, { paddingBottom }]}>
      <View style={styles.row}>
        {detail.mode === TripDetailMode.Template ? (
          <>
            {actionIcon}
            <StartActionButton
              label={t("template.detail.startRouteMap")}
              onPress={onStartTrip}
            />
          </>
        ) : (
          <>
            <View style={styles.statusBadge}>
              <Text variant="captionMedium" color="textSecondary">
                {t(`template.detail.status.${detail.status}`)}
              </Text>
            </View>
            {actionIcon}
          </>
        )}
      </View>
    </View>
  );
}

export const TripActions = memo(TripActionsComponent);
