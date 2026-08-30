import { Linking, Platform } from "react-native";

type OpenMapParams = {
  latitude: number;
  longitude: number;
  label?: string;
};

/** Native map schemes to try in order, best match first. */
function candidateUrls({ latitude, longitude, label }: OpenMapParams) {
  const coordinates = `${latitude},${longitude}`;
  const name = label ? encodeURIComponent(label) : "";

  if (Platform.OS === "ios") {
    return [
      `comgooglemaps://?q=${name || coordinates}&center=${coordinates}`,
      `maps://?ll=${coordinates}${name ? `&q=${name}` : ""}`,
    ];
  }

  if (Platform.OS === "android") {
    return [`geo:${coordinates}?q=${coordinates}${name ? `(${name})` : ""}`];
  }

  return [];
}

function webUrl({ latitude, longitude }: OpenMapParams) {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

/** Opens a map app at the coordinates, falling back to the web map. */
export async function openMap(params: OpenMapParams) {
  for (const url of candidateUrls(params)) {
    if (await Linking.canOpenURL(url)) {
      return Linking.openURL(url);
    }
  }

  return Linking.openURL(webUrl(params));
}
