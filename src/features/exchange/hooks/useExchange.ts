import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import type { BottomSheet } from "@shared/components";
import type { DropdownItem } from "@shared/types";
import { useGetExchangeRatesQuery } from "./query";
import type { ExchangeRate } from "../types";
import {
  applyExchangeConversion,
  formatExchangeAmount,
  formatRateUpdatedAt,
  getLatestRateUpdate,
  getUnitExchangeRate,
} from "../utils";

type CurrencyField = "from" | "to";

type ExchangeInfo = {
  heroRate: string;
  rateLabel: string;
  updatedLabel: string | null;
  /** How much more/less the target currency is worth vs. the source, as a
   * signed percentage: (unitRate - 1) * 100. e.g. 1 AOA = 1.6113 ARS -> +61.13. */
  changePercent: number;
};

const toDropdownItem = (rate: ExchangeRate): DropdownItem => ({
  label: rate.currency_code,
});

function findFlagUri(
  code?: string,
  rates?: ExchangeRate[],
): string | undefined {
  if (!code || !rates?.length) {
    return undefined;
  }
  return rates.find((rate) => rate.currency_code === code)?.flag ?? undefined;
}

export function useExchange() {
  const { t } = useTranslation();
  const sheetRef = useRef<BottomSheet>(null);

  const { data: rates } = useGetExchangeRatesQuery();

  const [activeField, setActiveField] = useState<CurrencyField>("from");
  const [lastEditedField, setLastEditedField] = useState<CurrencyField>("from");
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
    setFromCurrency((current) => current ?? toDropdownItem(rates[0]));
    setToCurrency((current) => current ?? toDropdownItem(rates[1] ?? rates[0]));
  }, [rates]);

  const applyConversion = useCallback(
    (sourceField: CurrencyField, sourceAmount: string) => {
      const result = applyExchangeConversion({
        sourceField,
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
    const sourceAmount = lastEditedField === "from" ? fromAmount : toAmount;
    applyConversion(lastEditedField, sourceAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyConversion, lastEditedField]);

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
      setLastEditedField("from");
      applyConversion("from", text);
    },
    [applyConversion],
  );

  const onChangeToAmount = useCallback(
    (text: string) => {
      setLastEditedField("to");
      applyConversion("to", text);
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
    return rates?.filter((rate) =>
      rate.currency_code.toLowerCase().includes(query),
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
      heroRate: formattedRate,
      rateLabel: `1 ${fromCurrency.label} = ${formattedRate} ${toCurrency.label}`,
      updatedLabel: latestUpdate
        ? t("exchange.lastUpdated", { time: formatRateUpdatedAt(latestUpdate) })
        : null,
      changePercent: (unitRate - 1) * 100,
    };
  }, [fromCurrency, toCurrency, rates, t]);

  return {
    filteredRates,
    sheetRef,
    fromCurrency,
    toCurrency,
    fromAmount,
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
    onChangeToAmount,
    onSheetChange,
  };
}
