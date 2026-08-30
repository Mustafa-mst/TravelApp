const API_URL =
  "https://places.googleapis.com/v1/places:searchNearby";
  const TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
  const PHOTO_BASE_URL = "https://places.googleapis.com/v1";

export async function googleNearbySearch(
  apiKey: string,
  body: unknown,
  fieldMask: string
) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": fieldMask,
    },
    body: JSON.stringify(body),
  });
}

export async function googleTextSearch(
  apiKey: string,
  body: unknown,
  fieldMask: string
) {
  return fetch(TEXT_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": fieldMask,
    },
    body: JSON.stringify(body),
  });
}

export async function googlePhoto(
  apiKey: string,
  photoName: string,
  maxWidthPx = 800,
) {
  return fetch(
    `${PHOTO_BASE_URL}/${photoName}/media?maxWidthPx=${maxWidthPx}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
      },
    },
  );
}