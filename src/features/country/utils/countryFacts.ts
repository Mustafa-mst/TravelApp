const SQUARE_KM_SUFFIX = "km²";
const ISO_CODE_LENGTH = 3;

export function formatNumber(value: number | undefined, locale: string) {
  if (value == null) {
    return undefined;
  }

  return new Intl.NumberFormat(locale).format(value);
}

export function formatArea(area: number | undefined, locale: string) {
  const formatted = formatNumber(area, locale);

  return formatted ? `${formatted} ${SQUARE_KM_SUFFIX}` : undefined;
}

/**
 * Hermes ships no `Intl.DisplayNames`, so codes stay as the row wrote them;
 * a bare ISO code is upper-cased to read as a code rather than a typo.
 */
export function formatLanguages(codes: string[] | undefined) {
  if (!codes?.length) {
    return undefined;
  }

  return codes
    .map((code) => (code.length <= ISO_CODE_LENGTH ? code.toUpperCase() : code))
    .join(", ");
}

export function formatList(values: string[] | undefined) {
  return values?.length ? values.join(", ") : undefined;
}

/** `idd` arrives as a bare `+90`, but some rows omit the plus. */
export function formatDiallingCode(idd: string | undefined) {
  const trimmed = idd?.trim();

  if (!trimmed) {
    return undefined;
  }

  return trimmed.startsWith("+") ? trimmed : `+${trimmed}`;
}
