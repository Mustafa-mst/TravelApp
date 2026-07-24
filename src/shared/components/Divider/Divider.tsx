import { memo, ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { colors, type Color } from "@shared/styles";
import { styles } from "./Divider.styles";

type DividerOrientation = "horizontal" | "vertical";

export type DividerProps = {
  orientation?: DividerOrientation;
  thickness?: number;
  color?: Color;
  margin?: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

function DividerComponent({
  orientation = "horizontal",
  thickness = 1,
  color = "border",
  margin = 16,
  children,
  style,
}: DividerProps) {
  const horizontal = orientation === "horizontal";

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

  if (!children) {
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
        {children}
      </View>

      <View style={[styles.segment, lineStyle]} />
    </View>
  );
}

export const Divider = memo(DividerComponent);
