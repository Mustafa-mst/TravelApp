import { memo } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTranslation } from "react-i18next";
import { PressableScale, Text } from "@shared/components";
import { styles } from "./CreateItineraryHeader.styles";
import { CloseIcon, SelectedIcon } from "@/shared/assets/icons";
import { colors } from "@/shared/styles";

export type CreateItineraryHeaderProps = {
  isEditing?: boolean;
  canSubmit: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

function CreateItineraryHeaderComponent({
  isEditing = false,
  canSubmit,
  isSubmitting,
  onCancel,
  onSubmit,
}: CreateItineraryHeaderProps) {
  const { t } = useTranslation();

  const submitDisabled = !canSubmit || isSubmitting;

  return (
    <View style={styles.container}>
      <PressableScale
        style={styles.iconButton}
        onPress={onCancel}
        disabled={isSubmitting}
      >
        <CloseIcon width={24} height={24} color={colors.iconPrimary} />
      </PressableScale>
      <Text variant="subtitle" color="textPrimary">
        {t(isEditing ? "itinerary.editTitle" : "itinerary.new")}
      </Text>
      <PressableScale
        style={[styles.iconButton, submitDisabled && styles.iconButtonDisabled]}
        onPress={onSubmit}
        disabled={submitDisabled}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <SelectedIcon width={24} height={24} color={colors.primary} />
        )}
      </PressableScale>
    </View>
  );
}

export const CreateItineraryHeader = memo(CreateItineraryHeaderComponent);
