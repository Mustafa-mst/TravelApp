import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TripDetailMode } from "../../constants";
import { toggleSavedTemplate } from "../../services";
import type { TripDetailView } from "../../types";
import { templateKeys } from "../query";

/**
 * Bookmarks a template, optimistically — the icon is the only feedback, so a
 * round trip before filling it reads as a dropped tap.
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
        if (!current || current.mode !== TripDetailMode.Template) {
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

    // The RPC returns the authoritative state, so write it instead of refetching.
    onSuccess: (result, templateId) => {
      queryClient.setQueryData<TripDetailView>(
        templateKeys.detail(templateId),
        (current) => {
          if (!current || current.mode !== TripDetailMode.Template) {
            return current;
          }
          return {
            ...current,
            is_saved: result.is_saved,
            saves_count: result.saves_count,
          };
        },
      );

      // Lists carry `saves_count`, so they are stale. Excluding "detail" keeps
      // the entry just written from being refetched.
      queryClient.invalidateQueries({
        queryKey: templateKeys.all,
        predicate: (query) => query.queryKey[1] !== "detail",
      });
    },
  });
}
