import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleSavedTemplate } from "../../services";
import type { TripDetailView } from "../../types";
import { templateKeys } from "../query/useDiscoverTemplatesQuery";

/**
 * Bookmarks / unbookmarks a template.
 *
 * Applied optimistically: the icon is the only feedback the user gets, so
 * waiting a round trip to fill it reads as a dropped tap. The detail cache is
 * patched immediately and rolled back if the RPC fails.
 *
 * On settle the whole template namespace is swept, not just the detail entry —
 * a save changes `saves_count` on the discovery lists and adds/removes the row
 * from the saved list, so the cards are stale too.
 */
export function useToggleSavedTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateId: string) => toggleSavedTemplate(templateId),

    onMutate: async (templateId) => {
      const key = templateKeys.detail(templateId);
      await queryClient.cancelQueries({ queryKey: key });

      const previous = queryClient.getQueryData<TripDetailView>(key);

      queryClient.setQueryData<TripDetailView>(key, (current) => {
        if (!current || current.mode !== "template") {
          return current;
        }
        return { ...current, is_saved: !current.is_saved };
      });

      return { previous };
    },

    onError: (_error, templateId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          templateKeys.detail(templateId),
          context.previous,
        );
      }
    },

    // The RPC returns the authoritative new state, so write it rather than
    // refetching the detail — the optimistic guess is confirmed (or corrected)
    // without a second round trip.
    onSuccess: (result, templateId) => {
      queryClient.setQueryData<TripDetailView>(
        templateKeys.detail(templateId),
        (current) => {
          if (!current || current.mode !== "template") {
            return current;
          }
          return {
            ...current,
            is_saved: result.is_saved,
            saves_count: result.saves_count,
          };
        },
      );

      // The lists carry `saves_count` and the saved set, so they are stale even
      // though the detail is now correct. Scoped to the card/list queries so the
      // detail entry just written is not immediately refetched.
      queryClient.invalidateQueries({
        queryKey: templateKeys.all,
        predicate: (query) => query.queryKey[1] !== "detail",
      });
    },
  });
}
