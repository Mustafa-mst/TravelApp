import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTemplateItem } from "../../services";
import type { NewTripTemplateItemInput } from "../../types";
import { templateKeys } from "../query";

/** `templateId` only drives cache invalidation; it is not part of the payload. */
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
