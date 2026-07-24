import { supabase } from "@shared/services";

import { PlaceTypes } from "../constants";
import type { PlaceType } from "../types";

export type GetNearbyPlacesParams = {
  latitude: number;
  longitude: number;
  type: PlaceTypes;
};

/** Fetches nearby places of a given category via the `places` edge function. */
export async function getNearbyPlaces({
  latitude,
  longitude,
  type,
}: GetNearbyPlacesParams) {
  const { data, error } = await supabase.functions.invoke("places", {
    body: {
      action: "nearby",
      latitude,
      longitude,
      type,
    },
  });

  if (error) {
    throw error;
  }

  return (data?.places ?? []) as PlaceType[];
}
