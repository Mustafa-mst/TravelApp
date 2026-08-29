import { StatusBar } from 'expo-status-bar';
import { AppProviders } from '@shared/providers';
import { RootNavigator } from '@shared/navigation';
import { useTheme } from '@shared/hooks';

// Split out so the status bar can read the theme, which only exists
// inside AppProviders.
function AppContent() {
  const { themeName } = useTheme();

  return (
    <>
      <RootNavigator />
      <StatusBar style={themeName === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}
