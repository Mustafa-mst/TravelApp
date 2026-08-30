import {
  ALLOWED_TYPES,
  DEFAULT_RADIUS,
  MAX_RESULTS,
  PlaceType,
} from "./constants.ts";

import { googleNearbySearch } from "./google.ts";
import { mapPlace } from "./mapper.ts";
import { corsHeaders } from "./cors.ts";

export async function nearbySearch(body: any) {
  const GOOGLE_API_KEY = Deno.env.get("GOOGLE_PLACES_API_KEY");

  if (!GOOGLE_API_KEY) {
    return json({ error: "Missing GOOGLE_PLACES_API_KEY" }, 500);
  }

  const { latitude, longitude, type } = body;

  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !ALLOWED_TYPES.includes(type as PlaceType)
  ) {
    return json({ error: "Invalid request" }, 400);
  }

  const response = await googleNearbySearch(
    GOOGLE_API_KEY,
    {
      includedTypes: [type],
      maxResultCount: MAX_RESULTS,
      locationRestriction: {
        circle: {
          center: { latitude, longitude },
          radius: DEFAULT_RADIUS,
        },
      },
    },
    "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.primaryType,places.photos"
  );

  if (!response.ok) {
    const error = await response.text();
    return json({ error }, response.status);
  }

  const data = await response.json();

  const places = (data.places ?? []).map(mapPlace);

  return json({ places });
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}