import { supabase } from "@/shared/services";
import type { DirectionsCoordinates, RouteType } from "../types/routes.types";

export async function getDirections(
  coordinates: DirectionsCoordinates,
): Promise<RouteType> {
  const { data, error } = await supabase.functions.invoke<RouteType>("routes", {
    body: {
      action: "directions",
      coordinates,
    },
  });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No route returned.");
  }

  return data;
}
