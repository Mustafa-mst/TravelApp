export function spacesToNewLines(text: string): string {
  if (text.includes(",")) {
    return text.replace(/,\s*/g, ",\n");
  }

  return text.replace(/\s+/g, "\n");
}
