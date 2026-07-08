import { type ReactNode, type Ref } from "react";
import { View } from "react-native";
import {
  BottomSheet as ExpoBottomSheet,
  BottomSheetView,
  type BottomSheetMethods,
} from "@expo/ui/community/bottom-sheet";

import { styles } from "./BottomSheet.styles";

// On Android this maps to a Material3 ModalBottomSheet with only two states:
// partial (~50%) and fully expanded. The library treats a *single* snap point as
// "skip the partial state" (skipPartiallyExpanded=true), which forces the sheet
// straight to full screen. Providing two snap points keeps the partial state
// enabled so the sheet opens at the lower snap point instead of full screen.
// See node_modules/@expo/ui/src/community/bottom-sheet/BottomSheet.android.tsx.
const DEFAULT_SNAP_POINTS = ["60%", "90%"];

export type BottomSheet = BottomSheetMethods;

export type BottomSheetProps = {
  ref?: Ref<BottomSheetMethods>;
  header?: ReactNode;
  children: ReactNode;
  snapPoints?: (string | number)[];
  onChange?: (index: number) => void;
};

export function BottomSheet({
  ref,
  header,
  children,
  snapPoints = DEFAULT_SNAP_POINTS,
  onChange,
}: BottomSheetProps) {
  return (
    <ExpoBottomSheet
      ref={ref}
      index={-1}
      handleComponent={null}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={onChange}
      backgroundStyle={styles.background}
    >
      <BottomSheetView style={styles.sheet}>
        <View style={styles.header}>
          <View style={styles.indicator} />
          {header}
        </View>
        <View style={styles.content}>{children}</View>
      </BottomSheetView>
    </ExpoBottomSheet>
  );
}
