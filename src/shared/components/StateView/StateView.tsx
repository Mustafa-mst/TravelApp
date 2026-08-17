import { memo, type ReactNode } from "react";
import {
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { AlertIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import type { StateViewContent } from "@shared/types";
import { StateViewBlock } from "./StateViewBlock";
import { styles } from "./StateView.styles";

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
  if (isLoading) {
    return (
      <View style={[styles.block, style]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <StateViewBlock
        {...error}
        Icon={error?.Icon ?? AlertIcon}
        iconColor={colors.iconInverted}
        badgeColor={colors.danger}
        style={style}
      />
    );
  }

  if (isEmpty) {
    return (
      <StateViewBlock
        {...empty}
        iconColor={colors.iconPrimary}
        badgeColor={colors.surface}
        style={style}
      />
    );
  }

  return <>{children}</>;
}

export const StateView = memo(StateViewComponent);
