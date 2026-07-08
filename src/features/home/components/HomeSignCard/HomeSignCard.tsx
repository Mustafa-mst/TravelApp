import { memo, type ComponentType } from "react";
import { Pressable, Text, View } from "react-native";
import { type SvgProps } from "react-native-svg";

import { colors } from "@shared/styles";
import { styles } from "./HomeSignCard.styles";

export type HomeSignCardProps = {
  label: string;
  TopIcon: ComponentType<SvgProps>;
  BadgeIcon: ComponentType<SvgProps>;
  onPress?: () => void;
};

function HomeSignCardComponent({
  label,
  TopIcon,
  BadgeIcon,
  onPress,
}: HomeSignCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <TopIcon color={'white'} width={20} height={20} />
      <View style={styles.separator} />
      <View style={styles.row}>
        <View style={styles.iconBadge}>
          <BadgeIcon width={18} height={18} color={colors.text} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
}

export const HomeSignCard = memo(HomeSignCardComponent);
