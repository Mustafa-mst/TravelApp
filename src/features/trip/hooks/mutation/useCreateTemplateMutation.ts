import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import type { TripTemplate, NewTripTemplateInput } from "../../types";
import { templateKeys } from "../query/useDiscoverTemplatesQuery";

export function useCreateTemplateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: NewTripTemplateInput) => {
      const { data, error } = await supabase
        .from("trip_templates")
        .insert(input)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as TripTemplate;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templateKeys.all });
    },
  });
}
