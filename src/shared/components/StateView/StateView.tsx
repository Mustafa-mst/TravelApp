import { memo, type ReactNode } from "react";
import {
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, type Color } from "@shared/styles";
import { Button } from "../Button";
import { Text } from "../Text";
import { styles } from "./StateView.styles";

type StateViewProps = {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  errorLabel?: string;
  emptyLabel?: string;
  emptyColor?: Color;
  retryLabel?: string;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

function StateViewComponent({
  isLoading,
  isError,
  isEmpty,
  errorLabel,
  emptyLabel,
  emptyColor = "textMuted",
  retryLabel,
  onRetry,
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
      <View style={[styles.block, style]}>
        <Text variant="body" color="danger">
          {errorLabel}
        </Text>
        {onRetry && retryLabel ? (
          <Button label={retryLabel} outlined onPress={onRetry} />
        ) : null}
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={[styles.block, style]}>
        <Text variant="body" color={emptyColor}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}

export const StateView = memo(StateViewComponent);
