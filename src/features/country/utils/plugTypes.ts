const PLUG_TYPE_PATTERN = /^[A-O]$/;

// A few rows append a prose note to the last real code, and the note's own
// commas then split into further entries — so parsing stops at that entry.
export function formatPlugTypes(plugTypes?: string[]): string | undefined {
  if (!plugTypes?.length) {
    return undefined;
  }

  const codes: string[] = [];

  for (const entry of plugTypes) {
    const [code] = entry.trim().split("(");
    const type = code.trim();

    if (!PLUG_TYPE_PATTERN.test(type)) {
      break;
    }

    codes.push(type);
  }

  return codes.length ? codes.join(", ") : undefined;
}
