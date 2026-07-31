export function toText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function toTextOrNull(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function toNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" ? value : fallback;
}

export function toNumberOrNull(value: unknown): number | null {
  return typeof value === "number" ? value : null;
}

export function toEnum<T extends string>(
  value: unknown,
  members: ReadonlySet<string>,
  fallback: T,
): T {
  return typeof value === "string" && members.has(value)
    ? (value as T)
    : fallback;
}

export function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}
