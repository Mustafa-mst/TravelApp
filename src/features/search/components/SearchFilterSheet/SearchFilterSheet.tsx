import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import {
  Accordion,
  BottomSheet,
  BottomSheetScroll,
  Button,
  SheetHeader,
} from "@shared/components";
import { useStyles } from "@shared/hooks";
import {
  FILTER_SHEET_SNAP_POINTS,
  searchFilterSheetStyles,
} from "./SearchFilterSheet.styles";
import { useSearchFilterDraft } from "../../hooks/useSearchFilterDraft";
import type { SearchFilters } from "../../types";

type SearchFilterSheetProps = {
  sheetRef: React.RefObject<BottomSheet | null>;
  filters: SearchFilters;
  onApply: (filters: SearchFilters) => void;
};

const SearchFilterSheetComponent = ({
  sheetRef,
  filters,
  onApply,
}: SearchFilterSheetProps) => {
  const { t } = useTranslation();
  const styles = useStyles(searchFilterSheetStyles);
  const { items, onClear, onApply: onApplyDraft } = useSearchFilterDraft({
    filters,
    onApply,
  });

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={FILTER_SHEET_SNAP_POINTS}
      header={
        <SheetHeader
          variant="inline"
          title={t("search.filters")}
          onClose={() => sheetRef.current?.dismiss()}
        />
      }
    >
      <BottomSheetScroll contentContainerStyle={styles.scrollContent}>
        <Accordion items={items} hideSeparator />
      </BottomSheetScroll>

      <View style={styles.footer}>
        <Button
          variant="outline"
          fullWidth
          label={t("search.filterClear")}
          onPress={onClear}
          containerStyle={styles.footerButton}
        />
        <Button
          fullWidth
          label={t("search.filterApply")}
          onPress={onApplyDraft}
          containerStyle={styles.footerButton}
        />
      </View>
    </BottomSheet>
  );
};

export const SearchFilterSheet = React.memo(SearchFilterSheetComponent);
