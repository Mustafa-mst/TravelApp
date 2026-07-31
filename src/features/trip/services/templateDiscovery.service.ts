import { supabase } from "@shared/services";
import type { TemplateCard } from "../types";

/**
 * Template browse lists. All read `v_template_cards`, the view with counts,
 * author and city already joined. The detail tree comes from `tripDetail.service`.
 */

const DISCOVERY_LIMIT = 10;

type TemplateCardsQuery = ReturnType<typeof selectTemplateCards>;

function selectTemplateCards() {
  return supabase.from("v_template_cards").select("*");
}

async function fetchCards(query: TemplateCardsQuery): Promise<TemplateCard[]> {
  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data ?? [];
}

export function getFeaturedTemplates(): Promise<TemplateCard[]> {
  return fetchCards(
    selectTemplateCards()
      .eq("visibility", "public")
      .eq("source", "system")
      .order("created_at", { ascending: false })
      .limit(DISCOVERY_LIMIT),
  );
}

export function getPopularTemplates(): Promise<TemplateCard[]> {
  return fetchCards(
    selectTemplateCards()
      .eq("visibility", "public")
      .order("saves_count", { ascending: false })
      .limit(DISCOVERY_LIMIT),
  );
}

// Unlike the two above, recent and mine are intentionally unlimited.
export function getRecentTemplates(): Promise<TemplateCard[]> {
  return fetchCards(
    selectTemplateCards()
      .eq("visibility", "public")
      .order("created_at", { ascending: false }),
  );
}

export function getMyTemplates(userId: string): Promise<TemplateCard[]> {
  return fetchCards(
    selectTemplateCards()
      .eq("author_id", userId)
      .order("created_at", { ascending: false }),
  );
}
