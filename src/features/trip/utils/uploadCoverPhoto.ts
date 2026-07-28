import { supabase } from "@shared/services";

// Named before templates were called templates. Renaming this would orphan
// every cover already uploaded, so it stays as-is.
const BUCKET = "itinerary-covers";

function resolveContentType(extension: string): string {
  return `image/${extension === "jpg" ? "jpeg" : extension}`;
}

/**
 * Uploads a local (file://) gallery image to Supabase Storage and returns its
 * public URL, so the template's cover_photo works across devices.
 */
export async function uploadCoverPhoto(
  userId: string,
  localUri: string,
): Promise<string> {
  const response = await fetch(localUri);
  const arrayBuffer = await response.arrayBuffer();

  const extension = localUri.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${userId}/${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, arrayBuffer, {
      contentType: resolveContentType(extension),
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
