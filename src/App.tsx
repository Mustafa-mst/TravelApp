import { StatusBar } from 'expo-status-bar';
import { AppProviders } from '@shared/providers';
import { RootNavigator } from '@shared/navigation';

export function App() {
  return (
    <AppProviders>
      <RootNavigator />
      <StatusBar style="auto" />
    </AppProviders>
  );
}
