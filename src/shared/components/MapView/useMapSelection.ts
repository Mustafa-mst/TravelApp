import { useCallback, useMemo, useRef, useState } from "react";
import type { MapMarker } from "./map.types";
import { markerKey } from "./map.utils";

export function useMapSelection(markers: MapMarker[] | undefined) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const pinPressed = useRef(false);

  const selectPin = useCallback((key: string) => {
    pinPressed.current = true;
    setSelectedKey((current) => (current === key ? null : key));
  }, []);

  const keepSelection = useCallback(() => {
    pinPressed.current = true;
  }, []);

  const dismiss = useCallback(() => {
    if (pinPressed.current) {
      pinPressed.current = false;
      return;
    }
    setSelectedKey(null);
  }, []);

  const selected = useMemo(
    () =>
      markers?.find(
        (marker, index) => markerKey(marker, index) === selectedKey,
      ),
    [markers, selectedKey],
  );

  return { selectedKey, selected, selectPin, keepSelection, dismiss };
}
