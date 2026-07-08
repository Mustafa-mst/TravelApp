import { useEffect, useState } from "react";
import { supabase } from "@shared/services";
import { useAuthStore } from "../../store";
import { toAuthSession } from "../../utils";

export function useSessionQuery() {
  const setSession = useAuthStore((state) => state.setSession);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) =>
        setSession(data.session ? toAuthSession(data.session) : null),
      )
      .finally(() => setIsLoading(false));

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ? toAuthSession(session) : null);
    });

    return () => data.subscription.unsubscribe();
  }, [setSession]);

  return { isLoading };
}
