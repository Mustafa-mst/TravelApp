const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;

/** Google's photo reference turned into a URL this function serves. */
export function photoUrl(photoName?: string | null) {
  return photoName
    ? `${SUPABASE_URL}/functions/v1/places?photoName=${encodeURIComponent(
        photoName,
      )}`
    : null;
}

export function mapPlace(place: any) {
  return {
    id: place.id,

    name: place.displayName?.text,

    address: place.formattedAddress,

    latitude: place.location?.latitude,

    longitude: place.location?.longitude,

    rating: place.rating,

    userRatingCount: place.userRatingCount,

    primaryType: place.primaryType,

    imageUrl: photoUrl(place.photos?.[0]?.name),
  };
}
