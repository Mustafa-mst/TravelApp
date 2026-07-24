import { memo } from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { ArrowLeftIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import { IconButton } from "../IconButton";
import { styles } from "./BackButton.styles";

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

  return (
    <IconButton
      variant="filled"
      onPress={onPress ?? navigation.goBack}
      style={[styles.button, { top: insets.top + offset }, style]}
      icon={<ArrowLeftIcon width={size} height={size} color={colors.text} />}
    />
  );
}

export const BackButton = memo(BackButtonComponent);
