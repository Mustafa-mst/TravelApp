import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useThemeColors } from "@shared/hooks";
import { LoginScreen } from "@/features/auth";
import { CountryDetailScreen } from "@/features/country";
import {
  CreateTemplateScreen,
  DayDetailScreen,
  TripDetailScreen,
} from "@/features/trip";
import { TabNavigator } from "./TabNavigator";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function FrontNavigator() {
  const colors = useThemeColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="CountryDetail"
        component={CountryDetailScreen}
      />
      <Stack.Screen
        name="TripDetail"
        component={TripDetailScreen}
      />
      <Stack.Screen
        name="DayDetail"
        component={DayDetailScreen}
      />
      <Stack.Screen
        name="CreateTemplate"
        component={CreateTemplateScreen}
        options={{
          animationDuration: 350,
          animation: "slide_from_bottom",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
