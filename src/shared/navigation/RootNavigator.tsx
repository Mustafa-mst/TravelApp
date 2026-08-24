import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSessionQuery } from "@/features/auth";
import { colors } from "@shared/styles";
import { FrontNavigator } from "./FrontNavigator";

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
    <NavigationContainer>
      <FrontNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});
