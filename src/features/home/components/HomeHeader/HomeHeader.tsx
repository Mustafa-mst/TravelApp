import { Divider, Text } from "@/shared/components";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { styles } from "./HomeHeader.styles";
import { SearchIcon } from "@/shared/assets/icons";
import {
  SquareAmasyaImage,
  SquareBhutanImage,
  SquareFranceImage,
  SquareLondonImage,
  SquareTombImage,
} from "@/shared/assets/images";

const HERO_IMAGES = [
  SquareTombImage,
  SquareFranceImage,
  SquareLondonImage,
  SquareBhutanImage,
  SquareAmasyaImage,
];

export type HomeHeaderProps = {
  style?: StyleProp<ViewStyle>;
};

function HomeHeaderComponent({ style }: HomeHeaderProps) {
  const { t } = useTranslation();

  return (
    <View style={style}>
      <Text variant="h4SemiBold">{t("home.header.title")}</Text>
      <View style={styles.body}>
        <View style={styles.tombRow}>
          {HERO_IMAGES.map((image, index) => (
            <Image
              key={index}
              source={image}
              resizeMode="cover"
              style={[
                styles.tombImage,
                index === 0 && styles.tombImageFirst,
                { transform: [{ rotate: index % 2 === 0 ? "5deg" : "-5deg" }] },
              ]}
            />
          ))}
        </View>

        <Pressable style={styles.searchBar}>
          <SearchIcon />
          <Divider orientation="vertical" margin={12} />
          <Text color="textSecondary">
            {t("home.header.searchPlaceholder")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export const HomeHeader = memo(HomeHeaderComponent);
