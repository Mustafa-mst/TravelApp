import { memo } from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { ArrowLeftIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import type { ShadowToken } from "@shared/styles";
import { IconButton } from "../IconButton";
import { backButtonShadows, backButtonStyles } from "./BackButton.styles";

type BackButtonProps = {
  onPress?: () => void;
  size?: number;
  offset?: number;
  shadow?: ShadowToken;
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
};

function BackButtonComponent({
  onPress,
  size = 22,
  offset = 8,
  shadow = "none",
  bordered = true,
  style,
}: BackButtonProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const styles = useStyles(backButtonStyles);
  const shadows = useStyles(backButtonShadows);
  const colors = useThemeColors();

  return (
    <IconButton
      variant="filled"
      onPress={onPress ?? navigation.goBack}
      style={[
        styles.button,
        bordered && styles.bordered,
        shadows[shadow],
        { top: insets.top + offset },
        style,
      ]}
      icon={
        <ArrowLeftIcon width={size} height={size} color={colors.foreground} />
      }
    />
  );
}

export const BackButton = memo(BackButtonComponent);
