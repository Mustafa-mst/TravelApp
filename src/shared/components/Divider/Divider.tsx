import { memo, ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { useThemeColors } from "@shared/hooks";
import { type ColorToken } from "@shared/styles";
import { styles } from "./Divider.styles";

type DividerOrientation = "horizontal" | "vertical";
type DividerVariant = "plain" | "dot";

export type DividerProps = {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  thickness?: number;
  color?: ColorToken;
  margin?: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

function DividerComponent({
  orientation = "horizontal",
  variant = "plain",
  thickness = 1,
  color = "border",
  margin = 16,
  children,
  style,
}: DividerProps) {
  const horizontal = orientation === "horizontal";
  const colors = useThemeColors();

  const tint = colors[color];

  const marginStyle = horizontal
    ? { marginVertical: margin }
    : { marginHorizontal: margin };

  const lineStyle = horizontal
    ? {
        height: thickness,
        backgroundColor: tint,
      }
    : {
        width: thickness,
        backgroundColor: tint,
      };

  const content =
    children ??
    (variant === "dot" ? (
      <View style={[styles.dot, { backgroundColor: tint }]} />
    ) : null);

  if (!content) {
    return (
      <View
        style={[
          horizontal ? styles.horizontal : styles.vertical,
          marginStyle,
          style,
        ]}
      >
        <View style={[styles.segment, lineStyle]} />
      </View>
    );
  }

  return (
    <View
      style={[
        horizontal ? styles.horizontal : styles.vertical,
        marginStyle,
        style,
      ]}
    >
      <View style={[styles.segment, lineStyle]} />

      <View
        style={[horizontal ? styles.horizontalContent : styles.verticalContent]}
      >
        {content}
      </View>

      <View style={[styles.segment, lineStyle]} />
    </View>
  );
}

export const Divider = memo(DividerComponent);
