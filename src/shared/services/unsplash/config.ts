import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

const unsplashAccessKey = extra.unsplashAccessKey as string | undefined;

if (!unsplashAccessKey) {
  throw new Error(
    'Unsplash yapılandırması eksik. .env içine EXPO_PUBLIC_UNSPLASH_ACCESS_KEY ekleyin.',
  );
}

export const unsplashConfig = {
  accessKey: unsplashAccessKey,
  searchUrl: 'https://api.unsplash.com/search/photos',
  fallbackImage:
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
};
