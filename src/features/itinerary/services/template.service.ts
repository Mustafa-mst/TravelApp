import { supabase } from "@shared/services";
import type { TemplateCard } from "../types";

export async function getFeaturedTemplates(): Promise<TemplateCard[]> {
  const { data, error } = await supabase
    .from("v_template_cards")
    .select("*")
    .eq("visibility", "public")
    .eq("source", "system")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getPopularTemplates(): Promise<TemplateCard[]> {
  const { data, error } = await supabase
    .from("v_template_cards")
    .select("*")
    .eq("visibility", "public")
    .order("saves_count", { ascending: false })
    .limit(10);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getRecentTemplates(): Promise<TemplateCard[]> {
  const { data, error } = await supabase
    .from("v_template_cards")
    .select("*")
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getMyTemplates(userId: string): Promise<TemplateCard[]> {
  const { data, error } = await supabase
    .from("v_template_cards")
    .select("*")
    .eq("author_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}
