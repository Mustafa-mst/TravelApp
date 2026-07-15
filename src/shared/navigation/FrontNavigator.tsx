import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "@/features/auth";
import { CountryDetailScreen } from "@/features/country";
import { TabNavigator } from "./TabNavigator";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function FrontNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="CountryDetail"
        component={CountryDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
