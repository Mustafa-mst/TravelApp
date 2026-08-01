/** Separate namespace from `templateKeys` so invalidating one does not sweep the other. */
export const tripKeys = {
  all: ["trips"] as const,
  list: (userId: string) => [...tripKeys.all, "list", userId] as const,
  detail: (tripId: string) => [...tripKeys.all, "detail", tripId] as const,
};
