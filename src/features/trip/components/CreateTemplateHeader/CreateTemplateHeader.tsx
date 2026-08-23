import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { PressableScale, Text } from "@shared/components";
import { useStyles, useThemeColors } from "@shared/hooks";
import { CloseIcon } from "@shared/assets/icons";
import {
  CLOSE_ICON_SIZE,
  createTemplateHeaderStyles,
} from "./CreateTemplateHeader.styles";

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
  const styles = useStyles(createTemplateHeaderStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Text variant="h4" color="foreground">
        {t(isEditing ? "template.editTitle" : "template.new")}
      </Text>
      <PressableScale
        style={styles.iconButton}
        onPress={onCancel}
        disabled={isSubmitting}
      >
        <CloseIcon
          width={CLOSE_ICON_SIZE}
          height={CLOSE_ICON_SIZE}
          color={colors.foreground}
        />
      </PressableScale>
    </View>
  );
}

export const CreateTemplateHeader = memo(CreateTemplateHeaderComponent);
