import { memo, type ReactNode } from "react";
import { View } from "react-native";
import { Image, type ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "@shared/styles";
import { styles } from "./HeroBanner.styles";

export type HeroBannerProps = {
  image?: ImageSource | string | number;
  height: number;
  children?: ReactNode;
};

function HeroBannerComponent({ image, height, children }: HeroBannerProps) {
  return (
    <View style={[styles.container, { height }]}>
      {image ? (
        <Image source={image} style={styles.image} contentFit="cover" />
      ) : (
        <LinearGradient
          colors={["#16A085", "#0E7C66", "#0F2A29"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.image}
        />
      )}

      <LinearGradient
        colors={["rgba(15, 42, 41, 0.45)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.overlay}
      />

      <LinearGradient
        colors={["transparent", colors.background]}
        start={{ x: 0, y: 0.35 }}
        end={{ x: 0, y: 1 }}
        style={styles.fade}
      />

      {children}
    </View>
  );
}

export const HeroBanner = memo(HeroBannerComponent);
