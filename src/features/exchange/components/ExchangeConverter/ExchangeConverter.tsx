import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { IconButton, StateView, Text } from "@shared/components";
import { CurrencyIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import { useExchange } from "../../hooks";
import { ConverterRow } from "../ConverterRow";
import { CurrencySheet } from "../CurrencySheet";
import {
  exchangeConverterStyles,
  SWAP_ICON_SIZE,
} from "./ExchangeConverter.styles";

export type ExchangeConverterProps = {
  /** Seeds the pair on first load. */
  fromCode?: string;
  toCode?: string;
};

function ExchangeConverterComponent({
  fromCode,
  toCode,
}: ExchangeConverterProps) {
  const { t } = useTranslation();
  const styles = useStyles(exchangeConverterStyles);
  const colors = useThemeColors();

  const {
    fromAmount,
    toAmount,
    fromCurrency,
    toCurrency,
    fromFlag,
    toFlag,
    exchangeInfo,
    isLoading,
    isError,
    onChangeFromAmount,
    onPressFromCurrency,
    onPressToCurrency,
    onSwapCurrencies,
    sheetRef,
    filteredRates,
    selectedCurrency,
    searchQuery,
    onChangeSearchQuery,
    onSelectCurrency,
    onSheetChange,
  } = useExchange({ fromCode, toCode });

  return (
    <>
      <StateView
        isLoading={isLoading}
        isError={isError}
        error={{
          label: t("exchange.loadError"),
          hint: t("exchange.loadErrorHint"),
        }}
      >
        <View style={styles.rows}>
          <ConverterRow
            value={fromAmount}
            onChangeText={onChangeFromAmount}
            flagUri={fromFlag}
            code={fromCurrency?.label}
            onPressCurrency={onPressFromCurrency}
          />
          <ConverterRow
            value={toAmount}
            flagUri={toFlag}
            code={toCurrency?.label}
            onPressCurrency={onPressToCurrency}
          />
          <IconButton
            accessibilityLabel={t("exchange.swap")}
            variant="filled"
            rounded
            style={styles.swapButton}
            onPress={onSwapCurrencies}
            icon={
              <CurrencyIcon
                width={SWAP_ICON_SIZE}
                height={SWAP_ICON_SIZE}
                color={colors.foreground}
                style={styles.swapIcon}
              />
            }
          />
        </View>

        {exchangeInfo ? (
          <View style={styles.footer}>
            <Text variant="bodyMedium" color="muted" textAlign="center">
              {exchangeInfo.rateLabel}
            </Text>
            {exchangeInfo.updatedLabel ? (
              <Text variant="caption" color="muted" textAlign="center">
                {exchangeInfo.updatedLabel}
              </Text>
            ) : null}
            <Text variant="caption" color="muted" textAlign="center">
              {t("exchange.referenceOnly")}
            </Text>
          </View>
        ) : null}
      </StateView>

      {/* Outside StateView: the sheet must stay mounted while rates load. */}
      <CurrencySheet
        sheetRef={sheetRef}
        rates={filteredRates}
        isLoading={isLoading}
        selectedCurrency={selectedCurrency}
        searchQuery={searchQuery}
        onChangeSearchQuery={onChangeSearchQuery}
        onSelectCurrency={onSelectCurrency}
        onSheetChange={onSheetChange}
      />
    </>
  );
}

export const ExchangeConverter = memo(ExchangeConverterComponent);
