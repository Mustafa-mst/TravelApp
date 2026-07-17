import { z } from "zod";
import i18n from "@shared/i18n";

export const createItinerarySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { error: () => i18n.t("itinerary.errors.nameRequired") }),
    city: z
      .string()
      .trim()
      .min(1, { error: () => i18n.t("itinerary.errors.cityRequired") }),
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine((values) => values.endDate >= values.startDate, {
    path: ["endDate"],
    error: () => i18n.t("itinerary.errors.endBeforeStart"),
  });

export type CreateItineraryValues = z.infer<typeof createItinerarySchema>;
