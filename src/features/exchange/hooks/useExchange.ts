import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import type { BottomSheet } from "@shared/components";
import type { DropdownItem } from "@shared/types";
import { useGetExchangeRatesQuery } from "./query";
import type { CurrencyField, ExchangeInfo, ExchangeRate } from "../types";
import {
  applyExchangeConversion,
  findFlagUri,
  formatAmountForDisplay,
  formatExchangeAmount,
  formatRateUpdatedAt,
  getLatestRateUpdate,
  getUnitExchangeRate,
  sanitizeAmountInput,
} from "../utils";

export type UseExchangeParams = {
  /** Seeds the pair on first load; falls back to the first two rates. */
  fromCode?: string;
  toCode?: string;
};

const toDropdownItem = (rate: ExchangeRate): DropdownItem => ({
  label: rate.currency_code,
});

export function useExchange({ fromCode, toCode }: UseExchangeParams = {}) {
  const { t } = useTranslation();
  const sheetRef = useRef<BottomSheet>(null);

  const { data: rates, isLoading, isError } = useGetExchangeRatesQuery();

  const [activeField, setActiveField] = useState<CurrencyField>("from");
  const [fromCurrency, setFromCurrency] = useState<DropdownItem | undefined>(
    undefined,
  );
  const [toCurrency, setToCurrency] = useState<DropdownItem | undefined>(
    undefined,
  );
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!rates?.length) {
      return;
    }

    const find = (code: string | undefined) =>
      rates.find((rate) => rate.currency_code === code);

    // The seed codes resolve after the rates do, so a matched code always
    // replaces the placeholder pair rather than deferring to it.
    const from = find(fromCode);
    const to = find(toCode);

    setFromCurrency((current) =>
      from ? toDropdownItem(from) : (current ?? toDropdownItem(rates[0])),
    );
    setToCurrency((current) =>
      to ? toDropdownItem(to) : (current ?? toDropdownItem(rates[1] ?? rates[0])),
    );
  }, [rates, fromCode, toCode]);

  const applyConversion = useCallback(
    (sourceAmount: string) => {
      const result = applyExchangeConversion({
        sourceAmount,
        fromCurrencyCode: fromCurrency?.label,
        toCurrencyCode: toCurrency?.label,
        rates,
      });

      setFromAmount(result.fromAmount);
      setToAmount(result.toAmount);
    },
    [fromCurrency?.label, toCurrency?.label, rates],
  );

  useEffect(() => {
    applyConversion(fromAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyConversion]);

  const openCurrencySheet = useCallback((field: CurrencyField) => {
    setActiveField(field);
    sheetRef.current?.present();
  }, []);

  const onPressFromCurrency = useCallback(
    () => openCurrencySheet("from"),
    [openCurrencySheet],
  );
  const onPressToCurrency = useCallback(
    () => openCurrencySheet("to"),
    [openCurrencySheet],
  );

  const onSelectCurrency = useCallback(
    (next: DropdownItem) => {
      if (activeField === "from") {
        setFromCurrency(next);
      } else {
        setToCurrency(next);
      }
      sheetRef.current?.dismiss();
    },
    [activeField],
  );

  const onSwapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const onChangeFromAmount = useCallback(
    (text: string) => {
      applyConversion(sanitizeAmountInput(text));
    },
    [applyConversion],
  );

  const onSheetChange = useCallback((index: number) => {
    // Reset the search when the picker closes so it reopens with a full list.
    if (index < 0) {
      setSearchQuery("");
    }
  }, []);

  const filteredRates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return rates;
    }
    return rates?.filter(
      (rate) =>
        rate.currency_code.toLowerCase().includes(query) ||
        rate.name?.toLowerCase().includes(query),
    );
  }, [rates, searchQuery]);

  const selectedCurrency = activeField === "from" ? fromCurrency : toCurrency;

  const fromFlag = useMemo(
    () => findFlagUri(fromCurrency?.label, rates),
    [fromCurrency, rates],
  );
  const toFlag = useMemo(
    () => findFlagUri(toCurrency?.label, rates),
    [toCurrency, rates],
  );

  const exchangeInfo = useMemo<ExchangeInfo | null>(() => {
    if (!fromCurrency || !toCurrency || !rates?.length) {
      return null;
    }

    const unitRate = getUnitExchangeRate(
      fromCurrency.label,
      toCurrency.label,
      rates,
    );
    if (unitRate == null) {
      return null;
    }

    const latestUpdate = getLatestRateUpdate(rates);
    const formattedRate = formatExchangeAmount(unitRate);

    return {
      rateLabel: `1 ${fromCurrency.label} = ${formattedRate} ${toCurrency.label}`,
      updatedLabel: latestUpdate
        ? t("exchange.lastUpdated", { time: formatRateUpdatedAt(latestUpdate) })
        : null,
    };
  }, [fromCurrency, toCurrency, rates, t]);

  return {
    filteredRates,
    isLoading,
    isError,
    sheetRef,
    fromCurrency,
    toCurrency,
    // State stays raw so it parses; the field shows it grouped.
    fromAmount: formatAmountForDisplay(fromAmount),
    toAmount,
    fromFlag,
    toFlag,
    selectedCurrency,
    exchangeInfo,
    searchQuery,
    onChangeSearchQuery: setSearchQuery,
    onPressFromCurrency,
    onPressToCurrency,
    onSelectCurrency,
    onSwapCurrencies,
    onChangeFromAmount,
    onSheetChange,
  };
}
