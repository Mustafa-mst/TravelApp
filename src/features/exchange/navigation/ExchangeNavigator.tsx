import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { backScreenOptions } from 'react-native-layer-stack';

import type { ExchangeStackParamList } from '@shared/navigation';
import { ExchangeScreen } from '../screens';

const Stack = createNativeStackNavigator<ExchangeStackParamList>();

/**
 * The native stack mounted inside the LayerStack's Exchange back target.
 * Spreads backScreenOptions so every back stack animates consistently.
 */
export function ExchangeNavigator() {
  return (
    <Stack.Navigator screenOptions={backScreenOptions}>
      <Stack.Screen name="ExchangeHome" component={ExchangeScreen} />
    </Stack.Navigator>
  );
}
