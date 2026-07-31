import { z } from "zod";
import i18n from "@shared/i18n";

export const MIN_TEMPLATE_DAYS = 1;
export const MAX_TEMPLATE_DAYS = 30;

export const createTemplateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: () => i18n.t("template.errors.nameRequired") }),
  city: z
    .string()
    .trim()
    .min(1, { error: () => i18n.t("template.errors.cityRequired") }),
  daysCount: z.number().int().min(MIN_TEMPLATE_DAYS).max(MAX_TEMPLATE_DAYS),
});

export type TemplateFormValues = z.infer<typeof createTemplateSchema>;
