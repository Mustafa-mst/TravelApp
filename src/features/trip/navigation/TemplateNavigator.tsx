import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { backScreenOptions } from "react-native-layer-stack";

import type { TemplateStackParamList } from "@shared/navigation";
import { CreateTemplateScreen } from "../screens";
import type { TripTemplate } from "../types";

const Stack = createNativeStackNavigator<TemplateStackParamList>();

export type TemplateNavigatorProps = {
  /** When set, the create screen opens in edit mode with these initial values. */
  template?: TripTemplate;
};

/**
 * The native stack mounted inside the LayerStack's createTemplate back target.
 * Spreads backScreenOptions so every back stack animates consistently.
 */
export function TemplateNavigator({ template }: TemplateNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={backScreenOptions}>
      <Stack.Screen
        name="CreateTemplate"
        component={CreateTemplateScreen}
        initialParams={{ template }}
      />
    </Stack.Navigator>
  );
}
