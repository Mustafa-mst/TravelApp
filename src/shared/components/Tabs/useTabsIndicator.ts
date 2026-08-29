import { useCallback, useRef, useState } from "react";
import type { LayoutChangeEvent, LayoutRectangle, ScrollView } from "react-native";

import { SCROLL_EDGE_PADDING } from "./tabs.constants";
import type { TabsScrollAlign } from "./tabs.types";

type Layouts = Record<string, LayoutRectangle>;

function resolveScrollOffset(
  layout: LayoutRectangle,
  viewportWidth: number,
  align: TabsScrollAlign,
) {
  switch (align) {
    case "start":
      return layout.x - SCROLL_EDGE_PADDING;
    case "end":
      return layout.x + layout.width - viewportWidth + SCROLL_EDGE_PADDING;
    case "center":
      return layout.x + layout.width / 2 - viewportWidth / 2;
    case "none":
      return null;
  }
}

export function useTabsIndicator(value: string, scrollAlign: TabsScrollAlign) {
  const scrollRef = useRef<ScrollView>(null);
  const viewportWidth = useRef(0);
  const [layouts, setLayouts] = useState<Layouts>({});

  const activeLayout = layouts[value];

  const scrollToActive = useCallback(
    (layout: LayoutRectangle) => {
      const width = viewportWidth.current;
      if (!width) {
        return;
      }

      const offset = resolveScrollOffset(layout, width, scrollAlign);
      if (offset === null) {
        return;
      }

      scrollRef.current?.scrollTo({ x: Math.max(0, offset), animated: true });
    },
    [scrollAlign],
  );

  const onViewportLayout = useCallback((event: LayoutChangeEvent) => {
    viewportWidth.current = event.nativeEvent.layout.width;
  }, []);

  // Measured per trigger; the active one also drives the auto-scroll.
  const measureTab = useCallback(
    (key: string, layout: LayoutRectangle) => {
      setLayouts((current) => ({ ...current, [key]: layout }));
      if (key === value) {
        scrollToActive(layout);
      }
    },
    [scrollToActive, value],
  );

  return {
    scrollRef,
    activeLayout,
    measureTab,
    onViewportLayout,
  };
}
