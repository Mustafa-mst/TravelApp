import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  Camera,
  GeoJSONSource,
  Layer,
  Map,
  Marker,
} from "@maplibre/maplibre-react-native";

import { MapPin } from "./MapPin";
import { MapPlaceCard } from "./MapPlaceCard";
import { MapZoomControl } from "./MapZoomControl";
import {
  MAP_ANIMATION_DURATION,
  MAP_ATTRIBUTION_POSITION,
  MAP_CARD_OFFSET,
  MAP_DEFAULT_ZOOM,
  MAP_FIT_PADDING,
  MAP_MAX_ZOOM,
  MAP_MIN_ZOOM,
  MAP_POLYLINE_SOURCE_ID,
  MAP_STYLE_URL,
} from "./map.constants";
import type { MapViewProps } from "./map.types";
import { markerKey, toPolylineCollection, toPosition } from "./map.utils";
import { useMapCamera } from "./useMapCamera";
import { useMapSelection } from "./useMapSelection";

function MapViewComponent({
  center,
  markers,
  polylines,
  style,
}: MapViewProps) {
  const { mapRef, cameraRef, fitBounds, zoomIn, zoomOut } =
    useMapCamera(markers);
  const { selectedKey, selected, selectPin, keepSelection, dismiss } =
    useMapSelection(markers);

  const polylineCollection = useMemo(
    () => toPolylineCollection(polylines),
    [polylines],
  );

  return (
    <View style={style}>
      <Map
        ref={mapRef}
        style={styles.map}
        mapStyle={MAP_STYLE_URL}
        logo={false}
        compass={false}
        attributionPosition={MAP_ATTRIBUTION_POSITION}
        touchRotate={false}
        touchPitch={false}
        onPress={dismiss}
      >
        {/* `center` and `bounds` are mutually exclusive on a camera stop. */}
        {fitBounds ? (
          <Camera
            ref={cameraRef}
            bounds={fitBounds}
            padding={MAP_FIT_PADDING}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            duration={MAP_ANIMATION_DURATION}
          />
        ) : (
          <Camera
            ref={cameraRef}
            center={toPosition(center)}
            zoom={MAP_DEFAULT_ZOOM}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            duration={MAP_ANIMATION_DURATION}
          />
        )}

        <GeoJSONSource id={MAP_POLYLINE_SOURCE_ID} data={polylineCollection}>
          <Layer
            id="map-polylines-line"
            type="line"
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{
              "line-color": ["get", "color"],
              "line-width": ["get", "width"],
            }}
          />
        </GeoJSONSource>

        {/* `Marker`, not `ViewAnnotation`: the latter rasterises its children
            on Android, so pins would draw but never receive taps. */}
        {markers?.map((marker, index) => {
          const key = markerKey(marker, index);

          return (
            <Marker
              key={key}
              id={`map-pin-${key}`}
              lngLat={toPosition(marker.coordinates)}
              anchor="center"
              onPress={() => selectPin(key)}
            >
              <MapPin badge={marker.badge} selected={key === selectedKey} />
            </Marker>
          );
        })}

        {selected ? (
          <Marker
            id="map-selected-card"
            lngLat={toPosition(selected.coordinates)}
            anchor="center"
            offset={MAP_CARD_OFFSET}
            onPress={() => {
              keepSelection();
              selected.onPress?.();
            }}
          >
            <MapPlaceCard
              imageUrl={selected.imageUrl}
              title={selected.title}
              badge={selected.badge}
            />
          </Marker>
        ) : null}
      </Map>

      <MapZoomControl onZoomIn={zoomIn} onZoomOut={zoomOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill,
  },
});

export const MapView = memo(MapViewComponent);
