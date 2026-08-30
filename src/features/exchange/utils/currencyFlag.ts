import type { ExchangeRate } from "../types";

export function findFlagUri(
  code?: string,
  rates?: ExchangeRate[],
): string | undefined {
  if (!code || !rates?.length) {
    return undefined;
  }

  return rates.find((rate) => rate.currency_code === code)?.flag ?? undefined;
}
