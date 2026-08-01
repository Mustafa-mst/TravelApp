import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { PressableScale, Text } from "@shared/components";
import { styles } from "./CreateTemplateHeader.styles";
import { CloseIcon } from "@/shared/assets/icons";
import { colors } from "@/shared/styles";

export type CreateTemplateHeaderProps = {
  isEditing?: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
};

function CreateTemplateHeaderComponent({
  isEditing = false,
  isSubmitting,
  onCancel,
}: CreateTemplateHeaderProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text variant="subtitle" color="textPrimary">
        {t(isEditing ? "template.editTitle" : "template.new")}
      </Text>
      <PressableScale
        style={styles.iconButton}
        onPress={onCancel}
        disabled={isSubmitting}
      >
        <CloseIcon width={24} height={24} color={colors.iconPrimary} />
      </PressableScale>
    </View>
  );
}

export const CreateTemplateHeader = memo(CreateTemplateHeaderComponent);
