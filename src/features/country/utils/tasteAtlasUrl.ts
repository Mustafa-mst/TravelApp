const TASTE_ATLAS_BASE_URL = "https://www.tasteatlas.com";

/** Opens the page scrolled to its dishes, skipping the country intro. */
const FOODS_ANCHOR = "#section-foods";

/**
 * Countries whose TasteAtlas slug is not the lowercase-hyphen form of their
 * English name. Keyed by ISO 3166-1 alpha-2 so a renamed country still resolves.
 */
const SLUG_OVERRIDES: Record<string, string> = {
  US: "usa",
  KR: "korea",
  CZ: "czech-republic",
  TL: "east-timor",
  CI: "ivory-coast",
};

/** Their slugs are plain ASCII, so "Türkiye" has to reach them as "turkiye". */
function toSlug(englishName: string) {
  return englishName
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[.']/g, "")
    .replace(/\s+/g, "-");
}

/**
 * TasteAtlas country page, anchored at its dishes. Slugs are the English name in
 * lowercase-hyphen form, apart from the overrides above. An unknown country lands
 * on their 404 page rather than breaking the app.
 */
export function tasteAtlasCountryUrl(cca2: string, englishName?: string) {
  const slug =
    SLUG_OVERRIDES[cca2.toUpperCase()] ?? (englishName && toSlug(englishName));

  if (!slug) {
    return null;
  }

  return `${TASTE_ATLAS_BASE_URL}/${slug}${FOODS_ANCHOR}`;
}
