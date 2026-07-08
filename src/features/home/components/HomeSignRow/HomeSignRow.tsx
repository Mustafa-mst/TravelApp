import { type ComponentType } from "react";
import { View } from "react-native";
import { type SvgProps } from "react-native-svg";
import { useFrontLayer } from "react-native-layer-stack";
import {
  ArrowInsertIcon,
  ArrowOutwardIcon,
  ArrowUpIcon,
  CurrencyIcon,
  EventNoteIcon,
  FavoriteIcon,
} from "@shared/assets/icons";
import type { BackTarget } from "@shared/navigation";
import { HomeSignCard } from "../HomeSignCard";
import { styles } from "./HomeSignRow.styles";

type SignItem = {
  id: string;
  label: string;
  TopIcon: ComponentType<SvgProps>;
  BadgeIcon: ComponentType<SvgProps>;
  // Which back-layer target this card opens. Cards without one aren't wired yet.
  target?: BackTarget;
};

const EXCHANGE_ITEMS: SignItem[] = [
  {
    id: "1",
    label: "Exchange",
    TopIcon: ArrowInsertIcon,
    BadgeIcon: CurrencyIcon,
    target: { target: "exchange" },
  },
  {
    id: "2",
    label: "Bookmarks",
    TopIcon: ArrowUpIcon,
    BadgeIcon: FavoriteIcon,
  },
  {
    id: "3",
    label: "Plans",
    TopIcon: ArrowOutwardIcon,
    BadgeIcon: EventNoteIcon,
  },
];

export function HomeSignRow() {
  const { open } = useFrontLayer<BackTarget>();

  return (
    <View style={styles.signRow}>
      <View style={styles.edge} />
      <View style={styles.signList}>
        {EXCHANGE_ITEMS.map((item, index) => (
          <View key={item.id} style={styles.signItem}>
            {index > 0 && <View style={styles.divider} />}
            <View style={styles.signItemContent}>
              <HomeSignCard
                label={item.label}
                TopIcon={item.TopIcon}
                BadgeIcon={item.BadgeIcon}
                onPress={item.target ? () => open(item.target!) : undefined}
              />
            </View>
          </View>
        ))}
      </View>
      <View style={styles.edge} />
    </View>
  );
}
