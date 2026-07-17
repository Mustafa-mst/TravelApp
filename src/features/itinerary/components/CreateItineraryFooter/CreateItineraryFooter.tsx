import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "@shared/components";
import { styles } from "./CreateItineraryFooter.styles";

export type CreateItineraryFooterProps = {
  canSubmit: boolean;
  isSubmitting: boolean;
  isEditing?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

function CreateItineraryFooterComponent({
  canSubmit,
  isSubmitting,
  isEditing = false,
  onCancel,
  onSubmit,
}: CreateItineraryFooterProps) {
  const { t } = useTranslation();

  const submitState = isSubmitting
    ? "loading"
    : canSubmit
      ? undefined
      : "disabled";

  return (
    <View style={styles.container}>
      <Button
        label={t("itinerary.cancel")}
        type="primary"
        outlined
        style={styles.button}
        onPress={onCancel}
      />
      <Button
        label={t(isEditing ? "itinerary.save" : "itinerary.add")}
        type="primary"
        state={submitState}
        style={styles.button}
        onPress={onSubmit}
      />
    </View>
  );
}

export const CreateItineraryFooter = memo(CreateItineraryFooterComponent);
