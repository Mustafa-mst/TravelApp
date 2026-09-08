import type { ReactNode } from "react";
import type { ScrollViewProps } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { useStyles } from "@shared/hooks";
import { bottomSheetScrollStyles } from "./BottomSheetScroll.styles";

export type BottomSheetScrollProps = ScrollViewProps & {
  children: ReactNode;
};

/** A sheet-aware ScrollView for fixed-height sheets whose content can grow. */
export function BottomSheetScroll({
  style,
  children,
  ...rest
}: BottomSheetScrollProps) {
  const styles = useStyles(bottomSheetScrollStyles);

  return (
    <BottomSheetScrollView
      style={[styles.scroll, style]}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </BottomSheetScrollView>
  );
}
