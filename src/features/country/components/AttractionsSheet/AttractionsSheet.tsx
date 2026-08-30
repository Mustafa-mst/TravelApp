import { memo, useCallback, type RefObject } from "react";

import {
  BottomSheet,
  BottomSheetList,
  Divider,
  SheetHeader,
  StateView,
} from "@shared/components";
import { useStyles } from "@shared/hooks";
import type { PlaceType } from "@/features/places";
import { AttractionRow } from "../AttractionRow";
import { useAttractionsSheet } from "./useAttractionsSheet";
import {
  ATTRACTIONS_SHEET_SNAP_POINTS,
  attractionsSheetStyles,
} from "./AttractionsSheet.styles";

export type AttractionsSheetProps = {
  sheetRef: RefObject<BottomSheet | null>;
  countryName?: string;
  countryCode?: string;
  /** Google is only queried once the sheet has been opened. */
  isOpen: boolean;
  onSheetChange: (index: number) => void;
};

const keyExtractor = (place: PlaceType) => place.id;

function AttractionsSheetComponent({
  sheetRef,
  countryName,
  countryCode,
  isOpen,
  onSheetChange,
}: AttractionsSheetProps) {
  const styles = useStyles(attractionsSheetStyles);

  const {
    title,
    places,
    openInMaps,
    isLoading,
    isError,
    emptyLabel,
    errorLabel,
    retryLabel,
    refetch,
  } = useAttractionsSheet({ countryName, countryCode, isOpen });

  const renderPlace = useCallback(
    ({ item, index }: { item: PlaceType; index: number }) => (
      <AttractionRow place={item} rank={index + 1} onPress={openInMaps} />
    ),
    [openInMaps],
  );

  const renderSeparator = useCallback(() => <Divider margin={0} />, []);

  const renderEmpty = useCallback(
    () => (
      <StateView
        isLoading={isLoading}
        isError={isError}
        isEmpty={!isLoading && !isError}
        error={{ label: errorLabel, onRetry: refetch, retryLabel }}
        empty={{ label: emptyLabel }}
        style={styles.stateBlock}
      />
    ),
    [
      isLoading,
      isError,
      errorLabel,
      refetch,
      retryLabel,
      emptyLabel,
      styles.stateBlock,
    ],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={ATTRACTIONS_SHEET_SNAP_POINTS}
      variant="page"
      elevatedHeader
      onChange={onSheetChange}
      header={
        <SheetHeader
          title={title}
          onClose={() => sheetRef.current?.dismiss()}
        />
      }
    >
      <BottomSheetList
        data={places}
        keyExtractor={keyExtractor}
        renderItem={renderPlace}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
      />
    </BottomSheet>
  );
}

export const AttractionsSheet = memo(AttractionsSheetComponent);
