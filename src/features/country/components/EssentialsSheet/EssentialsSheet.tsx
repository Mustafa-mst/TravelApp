import { memo, useCallback, type RefObject } from "react";
import { useTranslation } from "react-i18next";

import {
  BottomSheet,
  BottomSheetList,
  SheetHeader,
  StateView,
} from "@shared/components";
import { useStyles } from "@shared/hooks";
import type { CountryEssentialGroup } from "../../hooks";
import { EssentialsGroup } from "./EssentialsGroup";
import {
  ESSENTIALS_SHEET_SNAP_POINTS,
  essentialsSheetStyles,
} from "./EssentialsSheet.styles";

export type EssentialsSheetProps = {
  sheetRef: RefObject<BottomSheet | null>;
  groups: CountryEssentialGroup[];
};

const keyExtractor = (group: CountryEssentialGroup) => group.key;

function EssentialsSheetComponent({ sheetRef, groups }: EssentialsSheetProps) {
  const { t } = useTranslation();
  const styles = useStyles(essentialsSheetStyles);
  const emptyLabel = t("country.essentials.empty");

  const renderGroup = useCallback(
    ({ item }: { item: CountryEssentialGroup }) => (
      <EssentialsGroup group={item} />
    ),
    [],
  );

  const renderEmpty = useCallback(
    () => (
      <StateView isEmpty empty={{ label: emptyLabel }} style={styles.stateBlock} />
    ),
    [emptyLabel, styles.stateBlock],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={ESSENTIALS_SHEET_SNAP_POINTS}
      variant="page"
      elevatedHeader
      header={
        <SheetHeader
          title={t("country.sections.essentials.title")}
          onClose={() => sheetRef.current?.dismiss()}
        />
      }
    >
      <BottomSheetList
        data={groups}
        keyExtractor={keyExtractor}
        renderItem={renderGroup}
        contentContainerStyle={styles.content}
        ListEmptyComponent={renderEmpty}
      />
    </BottomSheet>
  );
}

export const EssentialsSheet = memo(EssentialsSheetComponent);
