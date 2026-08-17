import { type AccordionValue } from "./accordion.types";

export function toKeySet(value: AccordionValue) {
  if (value === undefined) {
    return new Set<string>();
  }
  return new Set(Array.isArray(value) ? value : [value]);
}
