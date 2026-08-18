import { ActivityIndicator, View } from "react-native";
import { LayerStack } from "react-native-layer-stack";
import { useSessionQuery } from "@/features/auth";
import { ExchangeNavigator } from "@/features/exchange";
import { TemplateNavigator } from "@/features/trip";
import { useStyles, useThemeColors } from "@shared/hooks";
import { FrontNavigator } from "./FrontNavigator";
import type { BackTarget } from "./types";
import { rootNavigatorStyles } from "./RootNavigator.styles";

function renderBack(target: BackTarget) {
  switch (target.target) {
    case "exchange":
      return <ExchangeNavigator />;
    case "createTemplate":
      return <TemplateNavigator template={target.params?.template} />;
  }
}

export function RootNavigator() {
  const { isLoading } = useSessionQuery();
  const colors = useThemeColors();
  const styles = useStyles(rootNavigatorStyles);

  if (isLoading) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <LayerStack<BackTarget>
      front={<FrontNavigator />}
      renderBack={renderBack}
      backLayerColor={colors.background}
      anchorColor={colors.separator}
    />
  );
}
