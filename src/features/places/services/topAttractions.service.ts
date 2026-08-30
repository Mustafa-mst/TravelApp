import { supabase } from "@shared/services";

import type { PlaceType } from "../types";

export type GetTopAttractionsParams = {
  country: string;
  countryCode?: string;
  languageCode?: string;
};

/** Fetches a country's best-known attractions via the `places` edge function. */
export async function getTopAttractions({
  country,
  countryCode,
  languageCode,
}: GetTopAttractionsParams) {
  const { data, error } = await supabase.functions.invoke("places", {
    body: {
      action: "topAttractions",
      country,
      countryCode,
      languageCode,
    },
  });

  if (error) {
    throw error;
  }

  return (data?.places ?? []) as PlaceType[];
}
