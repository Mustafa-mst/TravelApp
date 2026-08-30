import {
  TOP_ATTRACTIONS_LIMIT,
  TOP_ATTRACTIONS_PAGE_SIZE,
} from "./constants.ts";
import { googleTextSearch } from "./google.ts";
import { mapPlace } from "./mapper.ts";
import { readCache, writeCache } from "./attractionsCache.ts";
import { corsHeaders } from "./cors.ts";

const FIELD_MASK =
  "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.primaryType,places.photos,places.addressComponents";

export async function topAttractions(body: any) {
  const GOOGLE_API_KEY = Deno.env.get("GOOGLE_PLACES_API_KEY");

  if (!GOOGLE_API_KEY) {
    return json({ error: "Missing GOOGLE_PLACES_API_KEY" }, 500);
  }

  const { country, countryCode, languageCode } = body;

  if (typeof country !== "string" || !country.trim()) {
    return json({ error: "Invalid request" }, 400);
  }

  const region =
    typeof countryCode === "string" && countryCode.length === 2
      ? countryCode.toUpperCase()
      : undefined;

  const language = typeof languageCode === "string" ? languageCode : "en";

  // Only a known country can be cached; the code is half of the cache key.
  if (region) {
    const cached = await readCache(region, language);

    if (cached) {
      return json({ places: cached, source: "cache" });
    }
  }

  const response = await googleTextSearch(
    GOOGLE_API_KEY,
    {
      textQuery: `top tourist attractions in ${country.trim()}`,
      includedType: "tourist_attraction",
      pageSize: TOP_ATTRACTIONS_PAGE_SIZE,
      ...(region ? { regionCode: region } : {}),
      languageCode: language,
    },
    FIELD_MASK,
  );

  if (!response.ok) {
    const error = await response.text();
    return json({ error }, response.status);
  }

  const data = await response.json();

  // A text query alone leaks famous landmarks from other countries, so the
  // country component decides what stays.
  const matchesCountry = (place: any) =>
    !region ||
    place.addressComponents?.some(
      (component: any) =>
        component.types?.includes("country") &&
        component.shortText?.toUpperCase() === region,
    );

  // Google ranks by relevance; the screen promises "most famous", so the
  // review count decides the order.
  const entries = (data.places ?? [])
    .filter(matchesCountry)
    .sort(
      (a: any, b: any) => (b.userRatingCount ?? 0) - (a.userRatingCount ?? 0),
    )
    .slice(0, TOP_ATTRACTIONS_LIMIT)
    .map((place: any) => ({
      place: mapPlace(place),
      photoName: place.photos?.[0]?.name ?? null,
    }));

  if (region) {
    await writeCache(region, language, entries);
  }

  return json({
    places: entries.map((entry: any) => entry.place),
    source: "google",
  });
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
