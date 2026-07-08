import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { backScreenOptions } from "react-native-layer-stack";

import type { CategoriesStackParamList } from "@shared/navigation";
import { CategoriesScreen } from "../screens";

const Stack = createNativeStackNavigator<CategoriesStackParamList>();

type CategoriesNavigatorProps = {
  category: string;
};

/**
 * The native stack mounted inside the LayerStack's Categories back target.
 * Spreads backScreenOptions so every back stack animates consistently.
 */
export function CategoriesNavigator({ category }: CategoriesNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={backScreenOptions}>
      <Stack.Screen name="CategoriesHome">
        {() => <CategoriesScreen category={category} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
