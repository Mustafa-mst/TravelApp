export type RouteLeg = {
    distanceMeters: number;
    durationSeconds: number;
  };

  export type RouteType = {
    totalDistanceMeters: number;
    totalDurationSeconds: number;
    polyline: string;
    legs: RouteLeg[];
  };

  /** A single `[longitude, latitude]` point — ordered as the routes API expects. */
  export type Coordinate = [longitude: number, latitude: number];

  /** Ordered points the route is drawn through. */
  export type DirectionsCoordinates = Coordinate[];