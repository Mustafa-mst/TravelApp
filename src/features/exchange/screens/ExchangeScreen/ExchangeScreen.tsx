import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import { BackPanel } from "react-native-layer-stack";

import { BottomSheet, Card, IconButton, Text } from "@shared/components";
import { colors } from "@shared/styles";
import { styles } from "./ExchangeScreen.styles";
import { ArrowDownIcon } from "@/shared/assets/icons";
import { useExchange } from "../../hooks";
import { ExchangeSheetList } from "../../components/ExchangeSheetList";
import { ConverterRow } from "../../components/ConverterRow";
import { RateChangeBadge } from "../../components/RateChangeBadge";
import { SheetSearchHeader } from "../../components/SheetSearchHeader";

export function ExchangeScreen() {
  const { t } = useTranslation();

  const {
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
    onChangeSearchQuery,
    onPressFromCurrency,
    onPressToCurrency,
    onSelectCurrency,
    onSwapCurrencies,
    onChangeFromAmount,
    onChangeToAmount,
    onSheetChange,
  } = useExchange();

  return (
    <BackPanel>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text variant="subtitle" textAlign="center">
            {fromCurrency?.label ?? "—"} to {toCurrency?.label ?? "—"}
          </Text>
          <Text variant="caption" color="textMuted" textAlign="center">
            {t("exchange.liveRate")}
          </Text>

          {exchangeInfo ? (
            <>
              <Text
                variant="displaySemiBold"
                textAlign="center"
                style={styles.heroRate}
              >
                {exchangeInfo.heroRate}
              </Text>
              <View style={styles.heroRateRow}>
                <Text variant="bodyMedium" color="textMuted">
                  {exchangeInfo.rateLabel}
                </Text>
                <RateChangeBadge percent={exchangeInfo.changePercent} />
              </View>
              {exchangeInfo.updatedLabel ? (
                <Text variant="caption" color="textMuted" textAlign="center">
                  {exchangeInfo.updatedLabel}
                </Text>
              ) : null}
            </>
          ) : null}
        </View>

        <View style={styles.converterWrap}>
          <Card style={styles.converterCard}>
            <ConverterRow
              label={t("exchange.amount")}
              value={fromAmount}
              onChangeText={onChangeFromAmount}
              flagUri={fromFlag}
              code={fromCurrency?.label}
              onPressCurrency={onPressFromCurrency}
            />
            <View style={styles.divider} />
            <ConverterRow
              label={t("exchange.converted")}
              value={toAmount}
              onChangeText={onChangeToAmount}
              flagUri={toFlag}
              code={toCurrency?.label}
              onPressCurrency={onPressToCurrency}
            />
          </Card>

          <IconButton
            style={styles.swapButton}
            variant="filled"
            onPress={onSwapCurrencies}
            icon={
              <ArrowDownIcon
                width={18}
                height={18}
                color={colors.iconPrimary}
              />
            }
          />
        </View>

        <Text variant="caption" color="textMuted" textAlign="center">
          {t("exchange.referenceOnly")}
        </Text>
      </ScrollView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={["90%"]}
        header={
          <SheetSearchHeader
            title={t("exchange.selectCurrency")}
            value={searchQuery}
            onChangeText={onChangeSearchQuery}
            placeholder={t("search.placeholder")}
          />
        }
        onChange={onSheetChange}
      >
        <ExchangeSheetList
          data={filteredRates}
          onSelectItem={onSelectCurrency}
          selectedItem={selectedCurrency}
        />
      </BottomSheet>
    </BackPanel>
  );
}
