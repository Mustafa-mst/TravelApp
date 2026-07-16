import { type ReactNode, type Ref } from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheet as ExpoBottomSheet,
  type BottomSheetMethods,
} from "@expo/ui/community/bottom-sheet";

import { styles } from "./BottomSheet.styles";

// Snap-point behavior across platforms (see @expo/ui .../bottom-sheet):
//   - No snap points at all  → enableDynamicSizing kicks in and the sheet sizes
//     to its content (fitToContents on Android, medium/large-free detent on iOS).
//   - A *single* snap point   → Android sets skipPartiallyExpanded=true, forcing
//     the sheet straight to full screen. Avoid this.
//   - Two or more snap points → fixed snap states.
// Default to dynamic sizing (undefined) so the sheet hugs its content; callers
// pass snapPoints only when they need a fixed height.
export type BottomSheet = BottomSheetMethods;

export type BottomSheetProps = {
  ref?: Ref<BottomSheetMethods>;
  header?: ReactNode;
  children: ReactNode;
  /** Omit for content-hugging dynamic sizing. Pass 2+ points for fixed heights. */
  snapPoints?: (string | number)[];
  onChange?: (index: number) => void;
};

export function BottomSheet({
  ref,
  header,
  children,
  snapPoints,
  onChange,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();

  const resolvedSnapPoints = Platform.OS === "android" ? undefined : snapPoints;

  return (
    <ExpoBottomSheet
      ref={ref}
      index={-1}
      handleComponent={null}
      snapPoints={resolvedSnapPoints}
      enablePanDownToClose
      onChange={onChange}
      backgroundStyle={styles.background}
    >
      <View style={styles.header}>
        <View style={styles.indicator} />
        {header}
      </View>
      <View style={[styles.content, { paddingBottom: insets.bottom }]}>
        {children}
      </View>
    </ExpoBottomSheet>
  );
}
