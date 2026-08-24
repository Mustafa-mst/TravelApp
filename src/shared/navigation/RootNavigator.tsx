import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSessionQuery } from "@/features/auth";
import { Spinner } from "@shared/components";
import { useStyles } from "@shared/hooks";
import { FrontNavigator } from "./FrontNavigator";
import { rootNavigatorStyles } from "./RootNavigator.styles";

export function RootNavigator() {
  const { isLoading } = useSessionQuery();
  const styles = useStyles(rootNavigatorStyles);

  if (isLoading) {
    return (
      <View style={styles.splash}>
        <Spinner color="accent" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <FrontNavigator />
    </NavigationContainer>
  );
}
