import { createClient } from "jsr:@supabase/supabase-js@2";

import { photoUrl } from "./mapper.ts";

const TABLE = "country_attractions";
const THIRTY_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 30;

/** Service role: the table is read-only to anon, and the cache writes rows. */
function admin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

function toPlace(row: any) {
  return {
    id: row.place_id,
    name: row.name,
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,
    rating: row.rating,
    userRatingCount: row.user_rating_count,
    primaryType: row.primary_type,
    imageUrl: photoUrl(row.photo_name),
  };
}

/** Cached places for a country, or null when absent or past the TTL. */
export async function readCache(countryCode: string, languageCode: string) {
  const { data, error } = await admin()
    .from(TABLE)
    .select("*")
    .eq("country_code", countryCode)
    .eq("language_code", languageCode)
    .order("rank");

  if (error || !data?.length) {
    return null;
  }

  const age = Date.now() - new Date(data[0].fetched_at).getTime();

  if (age > THIRTY_DAYS_IN_MS) {
    return null;
  }

  return data.map(toPlace);
}

/**
 * Replaces a country's cached rows. A write failure is logged, not thrown: the
 * caller already has the places and should still get them.
 */
export async function writeCache(
  countryCode: string,
  languageCode: string,
  entries: { place: any; photoName: string | null }[],
) {
  if (!entries.length) {
    return;
  }

  const client = admin();

  const rows = entries.map(({ place, photoName }, index) => ({
    country_code: countryCode,
    language_code: languageCode,
    place_id: place.id,
    rank: index,
    name: place.name,
    address: place.address,
    latitude: place.latitude,
    longitude: place.longitude,
    rating: place.rating,
    user_rating_count: place.userRatingCount,
    primary_type: place.primaryType,
    photo_name: photoName,
    fetched_at: new Date().toISOString(),
  }));

  await client
    .from(TABLE)
    .delete()
    .eq("country_code", countryCode)
    .eq("language_code", languageCode);

  const { error } = await client.from(TABLE).insert(rows);

  if (error) {
    console.error("attractions cache write failed", error.message);
  }
}
