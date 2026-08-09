import { memo, type ReactNode } from "react";
import { Platform, View } from "react-native";
import { Image } from "expo-image";
import {
  FolderBackImage,
  SquareAmasyaImage,
  SquareBhutanImage,
  SquareFranceImage,
  SquareLondonImage,
  SquareTombImage,
} from "@shared/assets/images";
import { PressableScale, Text } from "@shared/components";
import { colors } from "@shared/styles";
import { countryCodeToFlag } from "@shared/utils/country";
import { styles } from "./TemplateFolderCard.styles";

/**
 * Ratios measured off the original Figma folder SVGs (296.57 x 249.99 artboard)
 * so the shape scales to any width without hardcoding pixel sizes.
 */
const VB_WIDTH = 296.57;
const VB_HEIGHT = 249.99;
const ASPECT = VB_HEIGHT / VB_WIDTH;
const RADIUS = 28.41 / VB_WIDTH;
const FRONT_HEIGHT = 177.96 / VB_HEIGHT;

const PHOTOS = [
  { x: 0.0246, y: 0.1297, w: 0.3572, ratio: 1, angle: -5 },
  { x: 0.2929, y: 0.0439, w: 0.3572, ratio: 1, angle: 5 },
  { x: 0.457, y: 0.1316, w: 0.4702, ratio: 0.707, angle: -10.55 },
];

/** Flag emoji, sitting on the pocket. */
const FLAG_X = 0.0848;
const FLAG_Y = 0.3095;
const FLAG_SIZE_ANDROID = 0.1;
const FLAG_SIZE_IOS = 0.137;

const FALLBACK_PHOTOS = [
  SquareTombImage,
  SquareFranceImage,
  SquareLondonImage,
  SquareBhutanImage,
  SquareAmasyaImage,
];

/**
 * Picks a fallback photo from the seed rather than at random, so a folder keeps
 * the same image across re-renders and list recycling.
 */
function pickFallbackPhoto(seed: string) {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }

  return FALLBACK_PHOTOS[Math.abs(hash) % FALLBACK_PHOTOS.length];
}

export type TemplateFolderCardProps = {
  width: number;
  title: string;
  subtitle?: string;
  /** ISO 3166-1 alpha-2 code; rendered as a flag emoji over the front pocket. */
  countryCode?: string | null;
  /** Fills the second photo in the fan; the first falls back to a stock image. */
  coverPhoto?: string | null;
  /** Keeps the fallback photo stable for a given folder. */
  seed?: string;
  children?: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
};

function TemplateFolderCardComponent({
  width,
  title,
  subtitle,
  countryCode,
  coverPhoto,
  seed,
  children,
  onPress,
  onLongPress,
}: TemplateFolderCardProps) {
  const height = width * ASPECT;
  const radius = width * RADIUS;
  const frontHeight = height * FRONT_HEIGHT;
  const flag = countryCodeToFlag(countryCode);
  const flagSize =
    width * (Platform.OS === "android" ? FLAG_SIZE_ANDROID : FLAG_SIZE_IOS);
  const fallbackPhoto = pickFallbackPhoto(seed ?? title);
  const photoSources = [
    fallbackPhoto,
    coverPhoto ? { uri: coverPhoto } : fallbackPhoto,
    undefined,
  ];

  return (
    <PressableScale
      style={[styles.wrapper, { width }]}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={!onPress && !onLongPress}
    >
      <View style={[styles.folder, { width, height }]}>
        <FolderBackImage
          width={width}
          height={height}
          color={colors.folderBack}
          style={styles.back}
        />

        {children ??
          PHOTOS.map(({ x, y, w, ratio, angle }, index) => {
            const photoWidth = width * w;
            const source = photoSources[index];

            return (
              <View
                key={angle}
                style={[
                  styles.photo,
                  {
                    left: width * x,
                    top: height * y,
                    width: photoWidth,
                    height: photoWidth * ratio,
                    borderWidth: 2,
                    borderRadius: 8,
                    transform: [{ rotate: `${angle}deg` }],
                  },
                ]}
              >
                {source ? (
                  <Image
                    source={source}
                    style={styles.photoImage}
                    contentFit="cover"
                  />
                ) : null}
              </View>
            );
          })}

        <View
          style={[styles.front, { height: frontHeight, borderRadius: radius }]}
        />

        {flag ? (
          <Text
            style={[
              styles.flag,
              {
                left: width * FLAG_X,
                top: height * FLAG_Y,
                fontSize: flagSize,
                lineHeight: flagSize * 1.4,
              },
            ]}
          >
            {flag}
          </Text>
        ) : null}
      </View>
      <View style={{ paddingTop: 16 }}>
        <Text variant="subtitle" numberOfLines={1} style={styles.label}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="body" color="textSecondary" style={styles.label}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </PressableScale>
  );
}

export const TemplateFolderCard = memo(TemplateFolderCardComponent);
