import { useCallback, useRef, useState } from "react";
import { useWindowDimensions, type View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DEFAULT_PORTAL_HOST, getHostOrigin } from "../Portal";
import { MENU_MIN_WIDTH, MENU_SCREEN_PADDING } from "./menu.constants";
import type { MenuAlign, MenuPlacement } from "./menu.types";

/** Trigger rect in window coordinates, from `ref.measureInWindow`. */
type AnchorRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type MenuPosition = {
  top: number;
  left: number;
  width?: number;
  maxHeight: number;
  /** False until the surface has been laid out and its side settled. */
  isMeasured: boolean;
};

type UseAnchorRectParams = {
  placement: MenuPlacement;
  align: MenuAlign;
  offset: number;
  alignOffset: number;
  width?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const isVertical = (placement: MenuPlacement) =>
  placement === "top" || placement === "bottom";

/** Flips to the opposite side when the preferred one cannot fit. */
function resolvePlacement(
  placement: MenuPlacement,
  anchor: AnchorRect,
  offset: number,
  bounds: { top: number; bottom: number; left: number; right: number },
  needed: { vertical: number; horizontal: number },
): MenuPlacement {
  const room = {
    top: anchor.y - offset - bounds.top,
    bottom: bounds.bottom - (anchor.y + anchor.height + offset),
    left: anchor.x - offset - bounds.left,
    right: bounds.right - (anchor.x + anchor.width + offset),
  };
  const opposite: Record<MenuPlacement, MenuPlacement> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
  };

  const flipped = opposite[placement];
  // Compared against the space the menu actually needs — room can be positive
  // yet still too small, which would leave the menu overlapping its trigger.
  const required = isVertical(placement) ? needed.vertical : needed.horizontal;

  return room[placement] < required && room[flipped] > room[placement]
    ? flipped
    : placement;
}

function alignAxis(
  align: MenuAlign,
  anchorStart: number,
  anchorSize: number,
  contentSize: number,
) {
  if (align === "start") {
    return anchorStart;
  }
  if (align === "end") {
    return anchorStart + anchorSize - contentSize;
  }
  return anchorStart + (anchorSize - contentSize) / 2;
}

export function useAnchorRect({
  placement,
  align,
  offset,
  alignOffset,
  width,
}: UseAnchorRectParams) {
  const triggerRef = useRef<View>(null);
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const measure = useCallback(
    () =>
      new Promise<void>((resolve) => {
        const node = triggerRef.current;
        if (!node) {
          resolve();
          return;
        }
        node.measureInWindow((x, y, measuredWidth, measuredHeight) => {
          // Both the trigger and the host are measured in window space, so the
          // difference is the anchor's position inside the host — the surface's
          // own coordinate system. Skipping this shifts the menu by however far
          // the host is offset from the React root.
          const origin = getHostOrigin(DEFAULT_PORTAL_HOST);
          setAnchor({
            x: x - origin.x,
            y: y - origin.y,
            width: measuredWidth,
            height: measuredHeight,
          });
          resolve();
        });
      }),
    [],
  );

  const bounds = {
    top: insets.top + MENU_SCREEN_PADDING,
    bottom: screenHeight - insets.bottom - MENU_SCREEN_PADDING,
    left: MENU_SCREEN_PADDING,
    right: screenWidth - MENU_SCREEN_PADDING,
  };

  let position: MenuPosition | null = null;

  if (anchor) {
    const contentWidth = width ?? MENU_MIN_WIDTH;
    const side = resolvePlacement(placement, anchor, offset, bounds, {
      vertical: contentHeight,
      horizontal: contentWidth,
    });
    const vertical = isVertical(side);

    const maxHeight = vertical
      ? side === "bottom"
        ? bounds.bottom - (anchor.y + anchor.height + offset)
        : anchor.y - offset - bounds.top
      : bounds.bottom - bounds.top;

    const height = contentHeight;

    const top = vertical
      ? side === "bottom"
        ? anchor.y + anchor.height + offset
        : anchor.y - offset - height
      : alignAxis(align, anchor.y, anchor.height, height) + alignOffset;

    const left = vertical
      ? alignAxis(align, anchor.x, anchor.width, contentWidth) + alignOffset
      : side === "right"
        ? anchor.x + anchor.width + offset
        : anchor.x - offset - contentWidth;

    position = {
      top: clamp(top, bounds.top, Math.max(bounds.top, bounds.bottom - height)),
      left: clamp(
        left,
        bounds.left,
        Math.max(bounds.left, bounds.right - contentWidth),
      ),
      width,
      maxHeight: Math.max(0, maxHeight),
      // Placement depends on the content height, so the first pass would
      // otherwise render at the wrong side and visibly jump once measured.
      isMeasured: contentHeight > 0,
    };
  }

  return { triggerRef, measure, position, setContentHeight };
}
