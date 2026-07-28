/**
 * Query keys for real trips. Kept in its own namespace rather than merged with
 * `templateKeys` so that invalidating one does not sweep the other: saving a
 * template invalidates the discovery lists and the template detail, while
 * editing a trip touches only that trip.
 */
export const tripKeys = {
  all: ["trips"] as const,
  list: (userId: string) => [...tripKeys.all, "list", userId] as const,
  detail: (tripId: string) => [...tripKeys.all, "detail", tripId] as const,
};
