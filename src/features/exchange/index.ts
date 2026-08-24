// Public API for the exchange feature. No deep imports allowed from outside.
// UI was removed — only the data layer (rates query, conversion state, math)
// is kept so a future screen can be rebuilt on top of it.
export {
  useExchange,
  useGetExchangeRatesQuery,
  exchangeRatesKeys,
} from "./hooks";
export {
  applyExchangeConversion,
  formatExchangeAmount,
  formatRateUpdatedAt,
  getLatestRateUpdate,
  getUnitExchangeRate,
} from "./utils";
export type { ExchangeRate } from "./types";
