import { type ComponentType } from "react";
import { Pressable, Text, View } from "react-native";
import { type SvgProps } from "react-native-svg";
import { useTranslation } from "react-i18next";
import type { ParseKeys } from "i18next";
import { useFrontLayer } from "react-native-layer-stack";
import {
  ArrowOutwardIcon,
  CurrencyIcon,
  EventNoteIcon,
  FavoriteIcon,
} from "@shared/assets/icons";
import { colors } from "@shared/styles";
import type { BackTarget } from "@shared/navigation";
import { styles } from "./HomeSignRow.styles";

type SignItem = {
  id: string;
  labelKey: ParseKeys;
  Icon: ComponentType<SvgProps>;
  // Which back-layer target this card opens. Cards without one aren't wired yet.
  target?: BackTarget;
};

const SIGN_ITEMS: SignItem[] = [
  {
    id: "exchange",
    labelKey: "home.signRow.exchange",
    Icon: CurrencyIcon,
    target: { target: "exchange" },
  },
  {
    id: "bookmarks",
    labelKey: "home.signRow.bookmarks",
    Icon: FavoriteIcon,
  },
  {
    id: "plans",
    labelKey: "home.signRow.plans",
    Icon: EventNoteIcon,
  },
  {
    id: "explore",
    labelKey: "home.signRow.explore",
    Icon: ArrowOutwardIcon,
  },
];

export function HomeSignRow() {
  const { t } = useTranslation();
  const { open } = useFrontLayer<BackTarget>();

  return (
    <View style={styles.signRow}>
      {SIGN_ITEMS.map((item) => (
        <View key={item.id} style={styles.tile}>
          <Pressable
            style={({ pressed }) => [styles.iconBox, pressed && styles.pressed]}
            onPress={item.target ? () => open(item.target!) : undefined}
          >
            <item.Icon width={28} height={28} color={colors.text} />
          </Pressable>
          <Text style={styles.label} numberOfLines={1}>
            {t(item.labelKey)}
          </Text>
        </View>
      ))}
    </View>
  );
}
