import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/shared/components";
import { useStyles } from "@shared/hooks";
import { dashboardScreenStyles } from "./DashboardScreen.styles";

export function DashboardScreen() {
  const { t } = useTranslation();
  const styles = useStyles(dashboardScreenStyles);

  return (
    <SafeAreaView style={styles.safe}>
      <Text variant="h1">{t("dashboard.title")}</Text>
    </SafeAreaView>
  );
}
