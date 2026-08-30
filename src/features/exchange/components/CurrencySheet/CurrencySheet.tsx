import { memo, useCallback, type RefObject } from "react";
import { Keyboard, View } from "react-native";
import { useTranslation } from "react-i18next";

import {
  BottomSheet,
  BottomSheetList,
  SearchField,
  SheetHeader,
  StateView,
} from "@shared/components";
import { useStyles } from "@shared/hooks";
import type { DropdownItem } from "@shared/types";
import type { ExchangeRate } from "../../types";
import { CurrencyListRow } from "../CurrencyListRow";
import {
  CURRENCY_SHEET_SNAP_POINTS,
  currencySheetStyles,
} from "./CurrencySheet.styles";

export type CurrencySheetProps = {
  sheetRef: RefObject<BottomSheet | null>;
  rates?: ExchangeRate[];
  isLoading: boolean;
  selectedCurrency?: DropdownItem;
  searchQuery: string;
  onChangeSearchQuery: (query: string) => void;
  onSelectCurrency: (item: DropdownItem) => void;
  onSheetChange: (index: number) => void;
};

const keyExtractor = (rate: ExchangeRate) => rate.currency_code;

function CurrencySheetComponent({
  sheetRef,
  rates,
  isLoading,
  selectedCurrency,
  searchQuery,
  onChangeSearchQuery,
  onSelectCurrency,
  onSheetChange,
}: CurrencySheetProps) {
  const { t } = useTranslation();
  const styles = useStyles(currencySheetStyles);
  const handleSelect = useCallback(
    (code: string) => {
      Keyboard.dismiss();
      onSelectCurrency({ label: code });
    },
    [onSelectCurrency],
  );

  const renderRow = useCallback(
    ({ item }: { item: ExchangeRate }) => (
      <CurrencyListRow
        rate={item}
        isSelected={item.currency_code === selectedCurrency?.label}
        onPress={handleSelect}
      />
    ),
    [handleSelect, selectedCurrency?.label],
  );

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    [styles.separator],
  );

  const renderEmpty = useCallback(
    () => (
      <StateView
        isLoading={isLoading}
        isEmpty={!isLoading}
        empty={{ label: t("exchange.noResults") }}
        style={styles.empty}
      />
    ),
    [isLoading, t, styles.empty],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={CURRENCY_SHEET_SNAP_POINTS}
      variant="page"
      elevatedHeader
      onChange={onSheetChange}
      header={
        <SheetHeader
          title={t("exchange.selectCurrency")}
          onClose={() => sheetRef.current?.dismiss()}
        >
          <SearchField
            value={searchQuery}
            onChangeText={onChangeSearchQuery}
            placeholder={t("exchange.searchPlaceholder")}
            autoFocus
          />
        </SheetHeader>
      }
    >
      <BottomSheetList
        data={rates ?? []}
        style={styles.card}
        contentContainerStyle={styles.cardContent}
        keyExtractor={keyExtractor}
        renderItem={renderRow}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmpty}
      />
    </BottomSheet>
  );
}

export const CurrencySheet = memo(CurrencySheetComponent);
