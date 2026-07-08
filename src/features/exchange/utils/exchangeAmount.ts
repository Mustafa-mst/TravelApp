import type { ExchangeRate } from "../types";

type CurrencyField = "from" | "to";

function getRate(rates: ExchangeRate[], currencyCode: string): number | undefined {
  return rates.find((rate) => rate.currency_code === currencyCode)?.rate;
}

export function convertExchangeAmount(
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

export function formatExchangeAmount(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
    minimumFractionDigits: 0,
  }).format(value);
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
  sourceField,
  sourceAmount,
  fromCurrencyCode,
  toCurrencyCode,
  rates,
}: {
  sourceField: CurrencyField;
  sourceAmount: string;
  fromCurrencyCode?: string;
  toCurrencyCode?: string;
  rates?: ExchangeRate[];
}): { fromAmount: string; toAmount: string } {
  if (!fromCurrencyCode || !toCurrencyCode || !rates?.length) {
    return sourceField === "from"
      ? { fromAmount: sourceAmount, toAmount: "" }
      : { fromAmount: "", toAmount: sourceAmount };
  }

  const parsed = Number.parseFloat(sourceAmount);
  if (!sourceAmount.trim() || Number.isNaN(parsed)) {
    return sourceField === "from"
      ? { fromAmount: sourceAmount, toAmount: "" }
      : { fromAmount: "", toAmount: sourceAmount };
  }

  if (sourceField === "from") {
    const converted = convertExchangeAmount(
      parsed,
      fromCurrencyCode,
      toCurrencyCode,
      rates,
    );

    return {
      fromAmount: sourceAmount,
      toAmount:
        converted != null ? formatExchangeAmount(converted) : "",
    };
  }

  const converted = convertExchangeAmount(
    parsed,
    toCurrencyCode,
    fromCurrencyCode,
    rates,
  );

  return {
    fromAmount: converted != null ? formatExchangeAmount(converted) : "",
    toAmount: sourceAmount,
  };
}
