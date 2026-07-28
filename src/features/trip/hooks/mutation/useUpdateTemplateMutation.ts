import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import type { TripTemplate, NewTripTemplateInput } from "../../types";
import { templateKeys } from "../query/useDiscoverTemplatesQuery";

export type UpdateTemplateInput = NewTripTemplateInput & {
  id: string;
};

export function useUpdateTemplateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateTemplateInput) => {
      const { data, error } = await supabase
        .from("trip_templates")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as TripTemplate;
    },
    onSuccess: () => {
      // Sweeps the lists and the detail view: editing the title, cover or day
      // count changes what the detail screen renders, not just the list rows.
      queryClient.invalidateQueries({ queryKey: templateKeys.all });
    },
  });
}
