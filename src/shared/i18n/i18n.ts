import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import tr from "./locales/tr";

export const resources = {
  en: { translation: en },
  tr: { translation: tr },
} as const;

export const supportedLanguages = Object.keys(resources) as Array<
  keyof typeof resources
>;

export const fallbackLanguage = "en";

const STORAGE_KEY = "app.language";

function resolveDeviceLanguage(): string {
  const deviceCode = getLocales()[0]?.languageCode ?? fallbackLanguage;
  return supportedLanguages.includes(deviceCode as keyof typeof resources)
    ? deviceCode
    : fallbackLanguage;
}

i18n.use(initReactI18next).init({
  resources,
  lng: resolveDeviceLanguage(),
  fallbackLng: fallbackLanguage,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

// Restore any previously persisted user selection, overriding the device default.
AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
  if (stored && stored !== i18n.language && supportedLanguages.includes(stored as keyof typeof resources)) {
    i18n.changeLanguage(stored);
  }
});

export async function setAppLanguage(language: keyof typeof resources) {
  await AsyncStorage.setItem(STORAGE_KEY, language);
  await i18n.changeLanguage(language);
}

export default i18n;
