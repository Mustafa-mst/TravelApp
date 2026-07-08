import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import { useAuthStore } from "../../store";

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      setSession(null);
      queryClient.clear();
    },
  });
}
