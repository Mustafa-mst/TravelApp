import {
  useCallback,
  useImperativeHandle,
  useRef,
  type ReactNode,
  type Ref,
} from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { useStyles, useThemeColors } from "@shared/hooks";
import { spacing } from "@shared/styles";
import { bottomSheetStyles, bottomSheetVariants } from "./BottomSheet.styles";
import type { BottomSheetVariant } from "./bottomSheet.types";

export type BottomSheet = {
  present: () => void;
  dismiss: () => void;
  close: () => void;
};

export type BottomSheetProps = {
  ref?: Ref<BottomSheet>;
  header?: ReactNode;
  children: ReactNode;
  /** Omit for content-hugging dynamic sizing. Pass points for fixed heights. */
  snapPoints?: (string | number)[];
  variant?: BottomSheetVariant;
  /** Raises the header above the content that scrolls under it. */
  elevatedHeader?: boolean;
  onChange?: (index: number) => void;
};

export function BottomSheet({
  ref,
  header,
  children,
  snapPoints,
  variant = "sheet",
  elevatedHeader = false,
  onChange,
}: BottomSheetProps) {
  const styles = useStyles(bottomSheetStyles);
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const modalRef = useRef<BottomSheetModal>(null);
  const lastIndexRef = useRef(-1);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useImperativeHandle(
    ref,
    () => ({
      present: () => modalRef.current?.present(),
      dismiss: () => modalRef.current?.dismiss(),
      close: () => modalRef.current?.dismiss(),
    }),
    [],
  );

  const handleChange = useCallback((index: number) => {
    lastIndexRef.current = index;
    onChangeRef.current?.(index);
  }, []);

  const handleDismiss = useCallback(() => {
    if (lastIndexRef.current !== -1) {
      lastIndexRef.current = -1;
      onChangeRef.current?.(-1);
    }
  }, []);

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        style={[backdropProps.style, { backgroundColor: colors.backdropStrong }]}
      />
    ),
    [colors.backdropStrong],
  );

  const hasSnapPoints = Boolean(snapPoints?.length);
  const { squareTop, showIndicator } = bottomSheetVariants[variant];
  const topInset = showIndicator ? insets.top : 0;

  const content = (
    <>
      <View
        style={[
          styles.header,
          squareTop && styles.squareTop,
          elevatedHeader && styles.headerElevated,
          { paddingTop: showIndicator ? undefined : insets.top },
        ]}
      >
        {showIndicator ? <View style={styles.indicator} /> : null}
        {header}
      </View>
      <View
        style={[
          styles.content,
          hasSnapPoints && styles.contentFill,
          { paddingBottom: Math.max(insets.bottom, spacing.lg) },
        ]}
      >
        {children}
      </View>
    </>
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      enableDynamicSizing={!hasSnapPoints}
      enablePanDownToClose
      onChange={handleChange}
      onDismiss={handleDismiss}
      handleComponent={null}
      backdropComponent={renderBackdrop}
      backgroundStyle={[styles.background, squareTop && styles.squareTop]}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      topInset={topInset}
    >
      {hasSnapPoints ? (
        <View style={styles.contentFill}>{content}</View>
      ) : (
        <BottomSheetView>{content}</BottomSheetView>
      )}
    </BottomSheetModal>
  );
}
