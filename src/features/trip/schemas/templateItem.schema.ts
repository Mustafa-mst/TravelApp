import { z } from "zod";
import i18n from "@shared/i18n";

const ITEM_TYPES = ["place", "activity", "note"] as const;

export const templateItemSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: () => i18n.t("template.errors.itemTitleRequired") }),
  type: z.enum(ITEM_TYPES),
  description: z.string().trim().optional(),
  startsAt: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export type TemplateItemValues = z.infer<typeof templateItemSchema>;
