export type CurrencyField = "from" | "to";

export type ExchangeRate = {
  currency_code: string;
  rate: number;
  updated_at: string;
  flag: string | null;
  name: string | null;
};

export type ExchangeInfo = {
  rateLabel: string;
  updatedLabel: string | null;
};
