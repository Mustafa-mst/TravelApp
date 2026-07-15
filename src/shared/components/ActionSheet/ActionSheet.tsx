import { type ComponentType, type ReactNode, type Ref } from "react";
import { View } from "react-native";
import { type SvgProps } from "react-native-svg";

import { colors } from "@shared/styles";
import { BottomSheet, type BottomSheet as BottomSheetRef } from "../BottomSheet";
import { PressableScale } from "../PressableScale";
import { Text } from "../Text";
import { styles } from "./ActionSheet.styles";

export type SheetAction = {
  id: string;
  label: string;
  description?: string;
  Icon: ComponentType<SvgProps>;
  onPress?: () => void;
  destructive?: boolean;
};

export type ActionSheetProps = {
  ref?: Ref<BottomSheetRef>;
  actions: SheetAction[];
  header?: ReactNode;
  snapPoints?: (string | number)[];
  /** Called after an action's onPress runs. Defaults to closing the sheet. */
  onSelect?: (action: SheetAction) => void;
};

export function ActionSheet({
  ref,
  actions,
  header,
  snapPoints,
  onSelect,
}: ActionSheetProps) {
  return (
    <BottomSheet ref={ref} snapPoints={snapPoints} header={header}>
      <View style={styles.card}>
        {actions.map((action, index) => (
          <PressableScale
            key={action.id}
            scaleTo={1}
            activeOpacity={0.6}
            style={[styles.row, index > 0 && styles.rowDivider]}
            onPress={() => {
              action.onPress?.();
              onSelect?.(action);
            }}
          >
            <action.Icon
              width={22}
              height={22}
              color={action.destructive ? colors.danger : colors.text}
            />
            <View style={styles.text}>
              <Text
                variant="bodyLargeMedium"
                color={action.destructive ? "danger" : "text"}
              >
                {action.label}
              </Text>
              {action.description ? (
                <Text variant="body" color="textTertiary" numberOfLines={2}>
                  {action.description}
                </Text>
              ) : null}
            </View>
          </PressableScale>
        ))}
      </View>
    </BottomSheet>
  );
}
