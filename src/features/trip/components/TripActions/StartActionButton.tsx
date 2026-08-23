import { memo } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { PressableScale, Text } from "@shared/components";
import { useStyles, useThemeColors } from "@shared/hooks";
import { DirectionRightIcon } from "@/shared/assets/icons";
import { ICON_SIZE, startActionButtonStyles } from "./StartActionButton.styles";

export type StartActionButtonProps = {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

function StartActionButtonComponent({
  label,
  onPress,
  style,
}: StartActionButtonProps) {
  const styles = useStyles(startActionButtonStyles);
  const colors = useThemeColors();

  return (
    <PressableScale
      onPress={onPress}
      disabled={!onPress}
      style={[styles.container, style]}
    >
      <Text color="staticWhite" variant="bodyLargeSemiBold">
        {label}
      </Text>
      <View style={styles.iconBadge}>
        <DirectionRightIcon
          color={colors.staticWhite}
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
      </View>
    </PressableScale>
  );
}

export const StartActionButton = memo(StartActionButtonComponent);
