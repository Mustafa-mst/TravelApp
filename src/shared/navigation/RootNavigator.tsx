import { ActivityIndicator, View } from "react-native";
import { LayerStack } from "react-native-layer-stack";
import { useSessionQuery } from "@/features/auth";
import { ExchangeNavigator } from "@/features/exchange";
import { colors } from "@shared/styles";
import { FrontNavigator } from "./FrontNavigator";
import type { BackTarget } from "./types";
import { styles } from "./RootNavigator.styles";

function renderBack(target: BackTarget) {
  switch (target.target) {
    case "exchange":
      return <ExchangeNavigator />;
  }
}

export function RootNavigator() {
  const { isLoading } = useSessionQuery();

  if (isLoading) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <LayerStack<BackTarget>
      front={<FrontNavigator />}
      renderBack={renderBack}
    />
  );
}
