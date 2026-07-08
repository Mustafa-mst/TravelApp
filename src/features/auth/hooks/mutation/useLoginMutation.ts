import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import { loginSchema, type LoginFormValues } from "../../schemas";
import { useAuthStore } from "../../store";
import { toAuthSession } from "../../utils";

type UseLoginOptions = {
  onSuccess?: () => void;
};

export function useLoginMutation({ onSuccess }: UseLoginOptions = {}) {
  const setSession = useAuthStore((state) => state.setSession);

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error || !data.session) {
        throw error ?? new Error("Oturum oluşturulamadı");
      }

      return toAuthSession(data.session);
    },
    onSuccess: setSession,
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
    onSuccess?.();
  });

  return {
    form,
    onSubmit,
    isSubmitting: isPending,
    error,
  };
}
