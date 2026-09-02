import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'myApp',
  slug: 'myApp',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  plugins: [
    'expo-image',
    [
      'expo-image-picker',
      {
        photosPermission:
          'Allow $(PRODUCT_NAME) to access your photos to pick a trip cover photo',
      },
    ],
    '@maplibre/maplibre-react-native',
    'expo-web-browser',
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.anonymous.myApp',
    infoPlist: {
      // Without this allowlist `canOpenURL` reports false and map links fall
      // back to the browser instead of opening a map app.
      LSApplicationQueriesSchemes: ['maps', 'comgooglemaps'],
    },
  },
  android: {
    package: 'com.anonymous.myApp',
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    unsplashAccessKey: process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY,
  },
};

export default config;
