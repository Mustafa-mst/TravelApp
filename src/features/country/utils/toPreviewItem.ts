import type { CountryReveals, DestinationItem, PreviewItem } from "../types";

export function toPreviewItem(
  item: DestinationItem | CountryReveals,
): PreviewItem {
  if ("location" in item) {
    return {
      key: item.id,
      text: item.location,
      image: item.image_url,
      countryId: item.country_code,
    };
  }

  return {
    key: String(item.id),
    text: item.title,
    image: item.image_url,
    countryId: item.country_code,
  };
}
