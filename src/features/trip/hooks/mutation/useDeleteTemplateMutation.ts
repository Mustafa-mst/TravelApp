import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import { templateKeys } from "../query";

export function useDeleteTemplateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("trip_templates")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templateKeys.all });
    },
  });
}
