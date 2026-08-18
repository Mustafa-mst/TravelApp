import { memo, type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { useStyles, useThemeColors } from "@shared/hooks";
import { shadows, spacing } from "@shared/styles";
import {
  timelineRailStyles,
  TRACK_GAP,
  LINE_WIDTH,
  CAP_WIDTH,
  RING_GAP,
  RING_WIDTH,
} from "./TimelineRail.styles";

export type TimelineRailProps = {
  isFirst?: boolean;
  isLast?: boolean;
  size?: number;
  nodeColor: string;
  trackColor?: string;
  capColor?: string;
  /** Draws a same-color outer ring around the node. */
  ring?: boolean;
  elevated?: boolean;
  /** Node's top offset inside the rail (marginTop). */
  nodeTop?: number;
  /** Inter-row spacing the parent applies via container gap. */
  rowGap?: number;
  children?: ReactNode;
  railStyle?: StyleProp<ViewStyle>;
  nodeStyle?: StyleProp<ViewStyle>;
};

/**
 * Left-side timeline rail: a cap (first row), a circular node, and a vertical
 * connector line bridging the gap to the next node. Layout-agnostic — the
 * parent supplies inter-row spacing via a container `gap`; the rail owns the
 * single connector formula. Node content is passed as `children`.
 */
function TimelineRailComponent({
  isFirst = false,
  isLast = false,
  size = 24,
  nodeColor,
  trackColor,
  capColor,
  ring = false,
  elevated = false,
  nodeTop = spacing.md,
  rowGap = spacing.md,
  children,
  railStyle,
  nodeStyle,
}: TimelineRailProps) {
  const styles = useStyles(timelineRailStyles);
  const colors = useThemeColors();

  const track = trackColor ?? colors.border;
  const connectorTop = nodeTop + size + TRACK_GAP;
  const connectorBottom = isLast ? 0 : -(rowGap + nodeTop - TRACK_GAP);

  const ringSize = size + 2 * (RING_GAP + RING_WIDTH);
  const ringOffset = RING_GAP + RING_WIDTH;

  return (
    <View style={[styles.rail, { width: size }, railStyle]}>
      {ring && (
        <View
          style={[
            styles.ring,
            {
              width: ringSize,
              height: ringSize,
              top: nodeTop - ringOffset,
              left: (size - ringSize) / 2,
              borderColor: nodeColor,
            },
          ]}
        />
      )}
      {isFirst && (
        <View
          style={[
            styles.cap,
            {
              left: (size - CAP_WIDTH) / 2,
              backgroundColor: capColor ?? track,
            },
          ]}
        />
      )}
      <View
        style={[
          styles.node,
          {
            width: size,
            height: size,
            marginTop: nodeTop,
            backgroundColor: nodeColor,
          },
          elevated && shadows.level2,
          nodeStyle,
        ]}
      >
        {children}
      </View>
      <View
        style={[
          styles.connector,
          {
            top: connectorTop,
            bottom: connectorBottom,
            left: (size - LINE_WIDTH) / 2,
            backgroundColor: track,
          },
        ]}
      />
    </View>
  );
}

export const TimelineRail = memo(TimelineRailComponent);
