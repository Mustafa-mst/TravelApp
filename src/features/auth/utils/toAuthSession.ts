import type { Session } from "@supabase/supabase-js";
import type { AuthSession } from "../types";

export function toAuthSession(session: Session): AuthSession {
  return {
    token: session.access_token,
    user: {
      id: session.user.id,
      email: session.user.email ?? "",
      name:
        (session.user.user_metadata?.name as string | undefined) ??
        session.user.email ??
        "",
    },
  };
}
