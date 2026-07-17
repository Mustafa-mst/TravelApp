import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/components";
import { styles } from "./CreateItineraryHeader.styles";

export type CreateItineraryHeaderProps = {
  isEditing?: boolean;
};

function CreateItineraryHeaderComponent({
  isEditing = false,
}: CreateItineraryHeaderProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text variant="h4" color="textPrimary">
        {t(isEditing ? "itinerary.editTitle" : "itinerary.new")}
      </Text>
    </View>
  );
}

export const CreateItineraryHeader = memo(CreateItineraryHeaderComponent);
