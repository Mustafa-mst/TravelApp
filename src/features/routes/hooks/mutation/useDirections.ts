import { useMutation } from "@tanstack/react-query";

import { getDirections } from "../../services/routes.services";
import type {
  DirectionsCoordinates,
  RouteType,
} from "../../types/routes.types";

export function useDirections() {
  return useMutation<RouteType, Error, DirectionsCoordinates>({
    mutationFn: getDirections,
  });
}
