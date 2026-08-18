import { memo, type ReactNode } from "react";
import {
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { AlertIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import type { StateViewContent } from "@shared/types";
import { StateViewBlock } from "./StateViewBlock";
import { stateViewStyles } from "./StateView.styles";

type StateViewProps = {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  error?: StateViewContent;
  empty?: StateViewContent;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

function StateViewComponent({
  isLoading,
  isError,
  isEmpty,
  error,
  empty,
  style,
  children,
}: StateViewProps) {
  const styles = useStyles(stateViewStyles);
  const colors = useThemeColors();

  if (isLoading) {
    return (
      <View style={[styles.block, style]}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (isError) {
    return (
      <StateViewBlock
        {...error}
        Icon={error?.Icon ?? AlertIcon}
        iconColor={colors.dangerForeground}
        badgeColor={colors.danger}
        style={style}
      />
    );
  }

  if (isEmpty) {
    return (
      <StateViewBlock
        {...empty}
        iconColor={colors.foreground}
        badgeColor={colors.surfaceSecondary}
        style={style}
      />
    );
  }

  return <>{children}</>;
}

export const StateView = memo(StateViewComponent);
