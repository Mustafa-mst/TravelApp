import { memo, type ComponentType } from "react";
import { View } from "react-native";
import { type SvgProps } from "react-native-svg";

import { Text } from "@shared/components";
import { useStyles, useThemeColors } from "@shared/hooks";
import { META_INFO_ICON_SIZE, metaInfoStyles } from "./MetaInfo.styles";

export type MetaInfoProps = {
  Icon: ComponentType<SvgProps>;
  label: string;
};

function MetaInfoComponent({ Icon, label }: MetaInfoProps) {
  const styles = useStyles(metaInfoStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.row}>
      <Icon
        width={META_INFO_ICON_SIZE}
        height={META_INFO_ICON_SIZE}
        color={colors.muted}
      />
      <Text
        variant="bodySemiBold"
        color="muted"
        style={styles.text}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

export const MetaInfo = memo(MetaInfoComponent);
