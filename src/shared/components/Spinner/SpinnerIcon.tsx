import { useId } from "react";
import Svg, { Defs, G, LinearGradient, Path, Stop } from "react-native-svg";
import { SPINNER_VIEWBOX } from "./spinner.constants";
import type { SpinnerIconProps } from "./spinner.types";

/**
 * Two gradient-filled arcs forming a ring: the first fades from opaque to 55%,
 * the second from transparent to 55%. That asymmetry reads as a tail once the
 * parent rotates. Ported from HeroUI Native's spinner-icon.tsx.
 */
export function SpinnerIcon({ width, height, color }: SpinnerIconProps) {
  // Gradient ids are document-global, so two differently coloured spinners on
  // one screen would otherwise share whichever registered first.
  const id = useId();
  const headGradientId = `spinner-head-${id}`;
  const tailGradientId = `spinner-tail-${id}`;

  return (
    <Svg width={width} height={height} viewBox={SPINNER_VIEWBOX}>
      <Defs>
        <LinearGradient
          id={headGradientId}
          x1="50%"
          x2="50%"
          y1="5.271%"
          y2="91.793%"
        >
          <Stop offset="0%" stopColor={color} />
          <Stop offset="100%" stopColor={color} stopOpacity={0.55} />
        </LinearGradient>
        <LinearGradient
          id={tailGradientId}
          x1="50%"
          x2="50%"
          y1="15.24%"
          y2="87.15%"
        >
          <Stop offset="0%" stopColor={color} stopOpacity={0} />
          <Stop offset="100%" stopColor={color} stopOpacity={0.55} />
        </LinearGradient>
      </Defs>
      <G fill="none">
        <Path
          d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
          fill={`url(#${headGradientId})`}
          transform="translate(1.5 1.625)"
        />
        <Path
          d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
          fill={`url(#${tailGradientId})`}
          transform="translate(1.5 1.625)"
        />
      </G>
    </Svg>
  );
}
