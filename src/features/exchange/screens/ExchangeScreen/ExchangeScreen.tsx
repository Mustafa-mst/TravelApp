import { useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { BackPanel, useBackLayer } from "react-native-layer-stack";

import { BottomSheet, DropdownInput, Text } from "@shared/components";
import type { DropdownItem } from "@shared/types";
import { styles } from "./ExchangeScreen.styles";
import { BackLayerTitle } from "@/shared/components/BackLayerTitle";
import { CurrencyIcon } from "@/shared/assets/icons";
import { useGetExchangeRatesQuery } from "../../hooks/query";
import { ExchangeSheetList } from "../../components/ExchangeSheetList";
import {
  applyExchangeConversion,
  formatExchangeAmount,
  formatRateUpdatedAt,
  getLatestRateUpdate,
  getUnitExchangeRate,
} from "../../utils";

type CurrencyField = "from" | "to";

export function ExchangeScreen() {
  const { close } = useBackLayer();
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
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const applyConversion = (
    sourceField: CurrencyField,
    sourceAmount: string,
  ) => {
    const result = applyExchangeConversion({
      sourceField,
      sourceAmount,
      fromCurrencyCode: fromCurrency?.label,
      toCurrencyCode: toCurrency?.label,
      rates,
    });

    setFromAmount(result.fromAmount);
    setToAmount(result.toAmount);
  };

  useEffect(() => {
    const sourceAmount = lastEditedField === "from" ? fromAmount : toAmount;
    applyConversion(lastEditedField, sourceAmount);
  }, [fromCurrency, toCurrency, rates]);

  const openCurrencySheet = (field: CurrencyField) => {
    setActiveField(field);
    sheetRef.current?.present();
  };

  const onSelectCurrency = (next: DropdownItem) => {
    if (activeField === "from") {
      setFromCurrency(next);
    } else {
      setToCurrency(next);
    }
    sheetRef.current?.dismiss();
  };

  const onChangeFromAmount = (text: string) => {
    setLastEditedField("from");
    applyConversion("from", text);
  };

  const onChangeToAmount = (text: string) => {
    setLastEditedField("to");
    applyConversion("to", text);
  };

  const selectedCurrency = activeField === "from" ? fromCurrency : toCurrency;

  const exchangeInfo = useMemo(() => {
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

    return {
      rateLabel: `1 ${fromCurrency.label} = ${formatExchangeAmount(unitRate)} ${toCurrency.label}`,
      updatedLabel: latestUpdate
        ? `Last updated: ${formatRateUpdatedAt(latestUpdate)}`
        : null,
    };
  }, [fromCurrency, toCurrency, rates]);

  return (
    <BackPanel>
      <View style={styles.container}>
        <BackLayerTitle
          icon={<CurrencyIcon width={27} height={27} />}
          title="Exchange"
          onPress={close}
        />

        <DropdownInput
          label="From"
          selectedItem={fromCurrency}
          dropdownPlaceholder={{
            label: "Currency",
            icon: <CurrencyIcon width={18} height={18} />,
          }}
          isOpen={isSheetOpen && activeField === "from"}
          onPressDropdown={() => openCurrencySheet("from")}
          placeholder="0.00"
          keyboardType="numeric"
          value={fromAmount}
          onChangeText={onChangeFromAmount}
        />

        <DropdownInput
          label="To"
          selectedItem={toCurrency}
          dropdownPlaceholder={{
            label: "Currency",
            icon: <CurrencyIcon width={18} height={18} />,
          }}
          isOpen={isSheetOpen && activeField === "to"}
          onPressDropdown={() => openCurrencySheet("to")}
          placeholder="0.00"
          keyboardType="numeric"
          value={toAmount}
          onChangeText={onChangeToAmount}
        />

        {exchangeInfo ? (
          <View style={styles.info}>
            <Text variant="bodyMedium" color="textMuted">
              {exchangeInfo.rateLabel}
            </Text>
            {exchangeInfo.updatedLabel ? (
              <Text variant="caption" color="textMuted">
                {exchangeInfo.updatedLabel}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>

      <BottomSheet
        ref={sheetRef}
        header={<Text variant="h5">Select currency</Text>}
        onChange={(index) => setIsSheetOpen(index >= 0)}
      >
        <ExchangeSheetList
          data={rates}
          onSelectItem={onSelectCurrency}
          selectedItem={selectedCurrency}
        />
      </BottomSheet>
    </BackPanel>
  );
}
