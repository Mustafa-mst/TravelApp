import { useQuery } from "@tanstack/react-query";
import { unsplashConfig } from "@shared/services";
import {
  useDebouncedValue,
  SEARCH_DEBOUNCE_MS,
  MIN_QUERY_LENGTH,
} from "../useDebouncedValue";

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const IMAGE_COUNT = 6;

export const coverPhotoKeys = {
  all: ["itineraryCoverPhoto"] as const,
  byCity: (city: string) => [...coverPhotoKeys.all, city] as const,
};

type UnsplashSearchResponse = {
  results: {
    urls: {
      regular: string;
      small: string;
    };
  }[];
};

export function useCoverPhotosQuery(city: string) {
  const debouncedCity = useDebouncedValue(city.trim(), SEARCH_DEBOUNCE_MS);

  return useQuery({
    queryKey: coverPhotoKeys.byCity(debouncedCity),
    enabled: debouncedCity.length >= MIN_QUERY_LENGTH,
    staleTime: DAY_IN_MS,
    retry: 1,
    queryFn: async () => {
      const params = new URLSearchParams({
        query: `${debouncedCity} city travel`,
        orientation: "landscape",
        content_filter: "high",
        per_page: String(IMAGE_COUNT),
      });

      const res = await fetch(`${unsplashConfig.searchUrl}?${params}`, {
        headers: {
          Authorization: `Client-ID ${unsplashConfig.accessKey}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unsplash request failed");
      }

      const data = (await res.json()) as UnsplashSearchResponse;

      return data.results
        .map((result) => result.urls?.regular)
        .filter((url): url is string => Boolean(url));
    },
  });
}
