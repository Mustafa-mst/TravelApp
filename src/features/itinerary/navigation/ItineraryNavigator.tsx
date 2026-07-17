import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { backScreenOptions } from "react-native-layer-stack";

import type { ItineraryStackParamList } from "@shared/navigation";
import { CreateItineraryScreen } from "../screens";
import type { Itinerary } from "../types";

const Stack = createNativeStackNavigator<ItineraryStackParamList>();

export type ItineraryNavigatorProps = {
  /** When set, the create screen opens in edit mode with these initial values. */
  itinerary?: Itinerary;
};

/**
 * The native stack mounted inside the LayerStack's createItinerary back target.
 * Spreads backScreenOptions so every back stack animates consistently.
 */
export function ItineraryNavigator({ itinerary }: ItineraryNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={backScreenOptions}>
      <Stack.Screen
        name="CreateItinerary"
        component={CreateItineraryScreen}
        initialParams={{ itinerary }}
      />
    </Stack.Navigator>
  );
}
