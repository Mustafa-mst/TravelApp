import { View } from "react-native";
import { memo, ReactNode } from "react";
import { styles } from "./BackLayerTitle.styles";
import { Text } from "../Text";
import { IconButton } from "../IconButton";
import { CloseIcon } from "@/shared/assets/icons";
import { colors } from "@/shared/styles";

type BackLayerTitleProps = {
  icon: ReactNode;
  title: string;
  onPress: () => void;
};

function BackLayerTitleComponent({ icon, title,onPress }: BackLayerTitleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        {icon && icon}
        <Text variant="h5">{title}</Text>
      </View>
      <IconButton
        style={styles.button}
        onPress={onPress}
        icon={<CloseIcon width={20} height={20} color={colors.text} />}
      />
    </View>
  );
}

export const BackLayerTitle = memo(BackLayerTitleComponent);
