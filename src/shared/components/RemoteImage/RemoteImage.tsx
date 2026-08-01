import { memo } from "react";
import { Image, type ImageProps } from "expo-image";

import { BLUR_HASH } from "@shared/constants";

function RemoteImageComponent({
  placeholder = { blurhash: BLUR_HASH },
  transition = 300,
  contentFit = "cover",
  ...rest
}: ImageProps) {
  return (
    <Image
      placeholder={placeholder}
      transition={transition}
      contentFit={contentFit}
      {...rest}
    />
  );
}

export const RemoteImage = memo(RemoteImageComponent);
