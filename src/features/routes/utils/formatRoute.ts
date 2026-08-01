/** "12.4 km" from meters (one decimal, or "0.4 km" under a km). Returns "-" when input is missing/invalid. */
export function formatDistance(meters?: number | null): string {
  if (meters == null || !Number.isFinite(meters)) {
    return "-";
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/** "1 h 25 min" / "25 min" from seconds (minute resolution). Returns "-" when input is missing/invalid. */
export function formatDuration(seconds?: number | null): string {
  if (seconds == null || !Number.isFinite(seconds)) {
    return "-";
  }
  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    return `${hours} h ${minutes} min`;
  }
  return `${minutes} min`;
}
