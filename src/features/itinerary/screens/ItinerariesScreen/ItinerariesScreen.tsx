import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/components";
import { styles } from "./ItinerariesScreen.styles";

export function ItinerariesScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <Text color="textPrimary" variant="h1">
        {t("itinerary.title")}
      </Text>
      <Text color="textSecondary" variant="body">
        {t("itinerary.empty")}
      </Text>
    </SafeAreaView>
  );
}
