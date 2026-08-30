import type { ExchangeRate } from "../types";

function getRate(rates: ExchangeRate[], currencyCode: string): number | undefined {
  return rates.find((rate) => rate.currency_code === currencyCode)?.rate;
}

function convertExchangeAmount(
  amount: number,
  fromCurrencyCode: string,
  toCurrencyCode: string,
  rates: ExchangeRate[],
): number | null {
  if (fromCurrencyCode === toCurrencyCode) {
    return amount;
  }

  const fromRate = getRate(rates, fromCurrencyCode);
  const toRate = getRate(rates, toCurrencyCode);

  if (fromRate == null || toRate == null || fromRate === 0) {
    return null;
  }

  return amount * (toRate / fromRate);
}

/** European throughout: "." groups thousands, "," marks the decimals. */
const GROUP_SEPARATOR = ".";
const DECIMAL_SEPARATOR = ",";
const MAX_RATE_DECIMALS = 4;
const MAX_WHOLE_DIGITS = 9;
const MAX_INPUT_DECIMALS = 4;

/**
 * Turns what the field shows back into a parseable string: grouping dots are
 * dropped, the decimal comma becomes ".", and any extra marks collapse so only
 * the first one splits the decimals.
 */
export function sanitizeAmountInput(text: string): string {
  const normalized = text
    .split(GROUP_SEPARATOR)
    .join("")
    .split(DECIMAL_SEPARATOR)
    .join(".")
    .replace(/[^\d.]/g, "");

  const [whole, ...rest] = normalized.split(".");
  const clampedWhole = whole.slice(0, MAX_WHOLE_DIGITS);

  if (!rest.length) {
    return clampedWhole;
  }

  return `${clampedWhole}.${rest.join("").slice(0, MAX_INPUT_DECIMALS)}`;
}

/**
 * Groups the integer part for display while leaving the decimals as typed, so
 * a half-finished "1234," or "1234,50" survives the round trip. State keeps the
 * raw "."-decimal string; only what the field shows is formatted.
 */
export function formatAmountForDisplay(amount: string): string {
  if (!amount) {
    return amount;
  }

  const [whole, decimals] = amount.split(".");
  const grouped = whole.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    GROUP_SEPARATOR,
  );

  return decimals === undefined
    ? grouped
    : `${grouped}${DECIMAL_SEPARATOR}${decimals}`;
}

export function formatExchangeAmount(value: number): string {
  const fixed = value.toFixed(MAX_RATE_DECIMALS);

  if (fixed.includes("e")) {
    return value.toLocaleString("de-DE", {
      maximumFractionDigits: MAX_RATE_DECIMALS,
    });
  }

  return formatAmountForDisplay(fixed.replace(/\.?0+$/, ""));
}

export function getUnitExchangeRate(
  fromCurrencyCode: string,
  toCurrencyCode: string,
  rates: ExchangeRate[],
): number | null {
  return convertExchangeAmount(1, fromCurrencyCode, toCurrencyCode, rates);
}

export function getLatestRateUpdate(rates: ExchangeRate[]): string | null {
  if (!rates.length) {
    return null;
  }

  return rates.reduce(
    (latest, rate) => (rate.updated_at > latest ? rate.updated_at : latest),
    rates[0].updated_at,
  );
}

export function formatRateUpdatedAt(isoDate: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));
}

export function applyExchangeConversion({
  sourceAmount,
  fromCurrencyCode,
  toCurrencyCode,
  rates,
}: {
  sourceAmount: string;
  fromCurrencyCode?: string;
  toCurrencyCode?: string;
  rates?: ExchangeRate[];
}): { fromAmount: string; toAmount: string } {
  const parsed = Number.parseFloat(sourceAmount);
  const canConvert =
    fromCurrencyCode && toCurrencyCode && rates?.length && !Number.isNaN(parsed);

  if (!canConvert) {
    return { fromAmount: sourceAmount, toAmount: "" };
  }

  const converted = convertExchangeAmount(
    parsed,
    fromCurrencyCode,
    toCurrencyCode,
    rates,
  );

  return {
    fromAmount: sourceAmount,
    toAmount: converted != null ? formatExchangeAmount(converted) : "",
  };
}
