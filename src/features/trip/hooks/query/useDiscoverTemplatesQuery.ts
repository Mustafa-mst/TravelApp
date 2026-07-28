import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth";
import {
  getFeaturedTemplates,
  getMyTemplates,
  getPopularTemplates,
  getRecentTemplates,
} from "../../services";

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

export const templateKeys = {
  all: ["templates"] as const,
  featured: () => [...templateKeys.all, "featured"] as const,
  popular: () => [...templateKeys.all, "popular"] as const,
  recent: () => [...templateKeys.all, "recent"] as const,
  mine: (userId: string) => [...templateKeys.all, "mine", userId] as const,
  detail: (templateId: string) =>
    [...templateKeys.all, "detail", templateId] as const,
};

export function useFeaturedTemplatesQuery() {
  const session = useAuthStore((state) => state.session);

  return useQuery({
    queryKey: templateKeys.featured(),
    enabled: Boolean(session),
    staleTime: FIVE_MINUTES_IN_MS,
    queryFn: getFeaturedTemplates,
  });
}

export function usePopularTemplatesQuery() {
  const session = useAuthStore((state) => state.session);

  return useQuery({
    queryKey: templateKeys.popular(),
    enabled: Boolean(session),
    staleTime: FIVE_MINUTES_IN_MS,
    queryFn: getPopularTemplates,
  });
}

export function useRecentTemplatesQuery() {
  const session = useAuthStore((state) => state.session);

  return useQuery({
    queryKey: templateKeys.recent(),
    enabled: Boolean(session),
    staleTime: FIVE_MINUTES_IN_MS,
    queryFn: getRecentTemplates,
  });
}

export function useMyTemplatesQuery() {
  const session = useAuthStore((state) => state.session);
  const userId = session?.user.id;

  return useQuery({
    queryKey: templateKeys.mine(userId ?? ""),
    enabled: Boolean(userId),
    staleTime: FIVE_MINUTES_IN_MS,
    queryFn: () => getMyTemplates(userId!),
  });
}
