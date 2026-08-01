import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth";
import {
  getFeaturedTemplates,
  getMyTemplates,
  getPopularTemplates,
  getRecentTemplates,
} from "../../services";
import type { TemplateCard } from "../../types";

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

/**
 * Everything here reads `trip_templates`, directly or through
 * `v_template_cards`, so a write can invalidate `all` and sweep every view.
 */
export const templateKeys = {
  all: ["templates"] as const,
  featured: () => [...templateKeys.all, "featured"] as const,
  popular: () => [...templateKeys.all, "popular"] as const,
  recent: () => [...templateKeys.all, "recent"] as const,
  mine: (userId: string) => [...templateKeys.all, "mine", userId] as const,
  /** The author's own templates, joined with their city (not the card view). */
  list: (userId: string) => [...templateKeys.all, "list", userId] as const,
  detail: (templateId: string) =>
    [...templateKeys.all, "detail", templateId] as const,
};

/** The public discovery lists: signed in is the only requirement. */
function useTemplateListQuery(
  queryKey: readonly unknown[],
  queryFn: () => Promise<TemplateCard[]>,
) {
  const session = useAuthStore((state) => state.session);

  return useQuery({
    queryKey,
    queryFn,
    enabled: Boolean(session),
    staleTime: FIVE_MINUTES_IN_MS,
  });
}

export function useFeaturedTemplatesQuery() {
  return useTemplateListQuery(templateKeys.featured(), getFeaturedTemplates);
}

export function usePopularTemplatesQuery() {
  return useTemplateListQuery(templateKeys.popular(), getPopularTemplates);
}

export function useRecentTemplatesQuery() {
  return useTemplateListQuery(templateKeys.recent(), getRecentTemplates);
}

export function useMyTemplatesQuery() {
  const userId = useAuthStore((state) => state.session)?.user.id;

  return useQuery({
    queryKey: templateKeys.mine(userId ?? ""),
    queryFn: () => getMyTemplates(userId ?? ""),
    enabled: Boolean(userId),
    staleTime: FIVE_MINUTES_IN_MS,
  });
}
