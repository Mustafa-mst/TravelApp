import { memo } from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { ArrowLeftIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import { IconButton } from "../IconButton";
import { backButtonStyles } from "./BackButton.styles";

type BackButtonProps = {
  onPress?: () => void;
  size?: number;
  offset?: number;
  style?: StyleProp<ViewStyle>;
};

function BackButtonComponent({
  onPress,
  size = 24,
  offset = 8,
  style,
}: BackButtonProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const styles = useStyles(backButtonStyles);
  const colors = useThemeColors();

  return (
    <IconButton
      variant="filled"
      onPress={onPress ?? navigation.goBack}
      style={[styles.button, { top: insets.top + offset }, style]}
      icon={
        <ArrowLeftIcon width={size} height={size} color={colors.foreground} />
      }
    />
  );
}

export const BackButton = memo(BackButtonComponent);
