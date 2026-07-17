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
    [
      'expo-maps',
      {
        requestLocationPermission: true,
        locationPermission: 'Allow $(PRODUCT_NAME) to use your location',
      },
    ],
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.anonymous.myApp',
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
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
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
      },
    },
  },
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    unsplashAccessKey: process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY,
  },
};

export default config;
