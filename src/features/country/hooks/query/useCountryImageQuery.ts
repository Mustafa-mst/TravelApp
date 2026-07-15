import { useQuery } from "@tanstack/react-query";
import { unsplashConfig } from "@shared/services";

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const IMAGE_COUNT = 3;

export const countryImageKeys = {
  all: ["countryImage"] as const,
  byCountry: (country: string) => [...countryImageKeys.all, country] as const,
};

type UnsplashSearchResponse = {
  results: {
    urls: {
      regular: string;
      small: string;
    };
  }[];
};

export function useCountryImageQuery(country: string) {
  return useQuery({
    queryKey: countryImageKeys.byCountry(country),
    enabled: Boolean(country),
    staleTime: DAY_IN_MS,
    retry: 1,
    queryFn: async () => {
      const params = new URLSearchParams({
        query: `${country} travel landscape landmark`,
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

      const urls = data.results
        .map((result) => result.urls?.regular)
        .filter((url): url is string => Boolean(url));

      return urls.length > 0 ? urls : [unsplashConfig.fallbackImage];
    },
  });
}
