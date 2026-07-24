import { memo, type ComponentType } from "react";
import { View } from "react-native";
import { type SvgProps } from "react-native-svg";

import { Text } from "@shared/components";
import { colors } from "@shared/styles";
import { styles } from "./MetaInfo.styles";

export type MetaInfoProps = {
  Icon: ComponentType<SvgProps>;
  label: string;
};

function MetaInfoComponent({ Icon, label }: MetaInfoProps) {
  return (
    <View style={styles.row}>
      <Icon width={16} height={16} color={colors.textMuted} />
      <Text variant="bodySemiBold" style={styles.text} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export const MetaInfo = memo(MetaInfoComponent);
