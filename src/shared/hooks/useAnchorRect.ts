import { useCallback, useRef, useState } from "react";
import { useWindowDimensions, type View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DEFAULT_PORTAL_HOST, getHostOrigin } from "@shared/components/Portal";
import type { AnchorAlign, AnchorPlacement, AnchorRect } from "@shared/types";

type AnchorPosition = {
  top: number;
  left: number;
  width?: number;
  maxWidth: number;
  /** Undefined while measuring, so the surface reports its natural height. */
  maxHeight?: number;
  /** False until the surface has been laid out and its side settled. */
  isMeasured: boolean;
};

type UseAnchorRectParams = {
  placement: AnchorPlacement;
  align: AnchorAlign;
  offset: number;
  alignOffset: number;
  minWidth: number;
  screenPadding: number;
  /** "trigger" matches the measured anchor width. */
  width?: number | "trigger";
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const isVertical = (placement: AnchorPlacement) =>
  placement === "top" || placement === "bottom";

/** Flips to the opposite side when the preferred one cannot fit. */
function resolvePlacement(
  placement: AnchorPlacement,
  anchor: AnchorRect,
  offset: number,
  bounds: { top: number; bottom: number; left: number; right: number },
  needed: { vertical: number; horizontal: number },
): AnchorPlacement {
  const room = {
    top: anchor.y - offset - bounds.top,
    bottom: bounds.bottom - (anchor.y + anchor.height + offset),
    left: anchor.x - offset - bounds.left,
    right: bounds.right - (anchor.x + anchor.width + offset),
  };
  const opposite: Record<AnchorPlacement, AnchorPlacement> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
  };

  const flipped = opposite[placement];
  // Compared against the space the surface actually needs — room can be
  // positive yet still too small, which would leave it overlapping its trigger.
  const required = isVertical(placement) ? needed.vertical : needed.horizontal;

  return room[placement] < required && room[flipped] > room[placement]
    ? flipped
    : placement;
}

function alignAxis(
  align: AnchorAlign,
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
  minWidth,
  screenPadding,
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
          // own coordinate system. Skipping this shifts the surface by however
          // far the host is offset from the React root.
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
    top: insets.top + screenPadding,
    bottom: screenHeight - insets.bottom - screenPadding,
    left: screenPadding,
    right: screenWidth - screenPadding,
  };

  let position: AnchorPosition | null = null;

  if (anchor) {
    const isMeasured = contentHeight > 0;
    const requestedWidth = width === "trigger" ? anchor.width : width;
    // Capped, not just positioned: clamping `left` alone moves a too-wide
    // surface flush to the left edge and lets it overhang on the right, since
    // the overflow has nowhere to go.
    const available = bounds.right - bounds.left;
    const fixedWidth =
      requestedWidth === undefined
        ? undefined
        : Math.min(requestedWidth, available);
    const contentWidth = fixedWidth ?? Math.min(minWidth, available);
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
      width: fixedWidth,
      // Guards the surface's own minWidth, which would otherwise win over a
      // capped width and reintroduce the overhang on a narrow screen.
      maxWidth: available,
      // Left uncapped for the measuring pass: capping it makes onLayout report
      // the clipped height, and a surface that does not fit then measures as
      // exactly the room available — so the flip above never fires. The pass is
      // invisible (isMeasured is false), so nothing overflows on screen.
      maxHeight: isMeasured ? Math.max(0, maxHeight) : undefined,
      // Placement depends on the content height, so the first pass would
      // otherwise render at the wrong side and visibly jump once measured.
      isMeasured,
    };
  }

  return { triggerRef, measure, position, setContentHeight };
}
