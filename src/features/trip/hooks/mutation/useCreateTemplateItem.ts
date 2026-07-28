import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTemplateItem } from "../../services";
import type { NewTripTemplateItemInput } from "../../types";
import { templateKeys } from "../query/useDiscoverTemplatesQuery";

/**
 * Creates an item. `templateId` is only used to invalidate the template detail
 * query so the detail and day screens refresh; it is not part of the DB payload.
 *
 * Only the detail entry is swept, not `templateKeys.all` — an item does not
 * change the list rows (title, cover, day count), so the discovery lists and
 * the author's list stay valid.
 */
export type CreateTemplateItemVariables = {
  templateId: string;
  input: NewTripTemplateItemInput;
};

export function useCreateTemplateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ input }: CreateTemplateItemVariables) =>
      createTemplateItem(input),
    onSuccess: (_data, { templateId }) => {
      queryClient.invalidateQueries({
        queryKey: templateKeys.detail(templateId),
      });
    },
  });
}
