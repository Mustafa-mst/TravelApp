import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/shared/components";
import { styles } from "./DashboardScreen.styles";

export function DashboardScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safe}>
      <Text variant="h4SemiBold">{t("dashboard.title")}</Text>
    </SafeAreaView>
  );
}
