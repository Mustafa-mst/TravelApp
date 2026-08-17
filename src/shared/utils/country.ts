import type { CountryNameType } from "@shared/types";

/** Offset from an ASCII capital letter to its regional indicator symbol. */
const REGIONAL_INDICATOR_OFFSET = 0x1f1e6 - 0x41;

export function resolveCountryName(
  name: CountryNameType | null | undefined,
  language: string,
  cca2: string,
): string {
  return name?.[language]?.common ?? name?.en?.common ?? cca2;
}

/**
 * Turns an ISO 3166-1 alpha-2 code into its flag emoji ("TR" → 🇹🇷). The emoji
 * is a pair of regional indicator symbols, which the OS renders as one glyph —
 * so no image request is needed to show a flag.
 *
 * Returns null for anything that is not two ASCII letters, since a malformed
 * pair would render as stray letter blocks rather than a flag.
 */
export function countryCodeToFlag(code: string | null | undefined): string | null {
  if (!code || code.length !== 2) {
    return null;
  }

  const upper = code.toUpperCase();

  if (!/^[A-Z]{2}$/.test(upper)) {
    return null;
  }

  return String.fromCodePoint(
    upper.charCodeAt(0) + REGIONAL_INDICATOR_OFFSET,
    upper.charCodeAt(1) + REGIONAL_INDICATOR_OFFSET,
  );
}
