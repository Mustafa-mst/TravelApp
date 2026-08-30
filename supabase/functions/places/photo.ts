import { googlePhoto } from "./google.ts";
import { corsHeaders } from "./cors.ts";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export async function handlePhoto(req: Request, apiKey: string) {
  const url = new URL(req.url);

  const photoName = url.searchParams.get("photoName");

  if (!photoName) {
    return new Response(
      JSON.stringify({
        error: "photoName is required",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }

  const googleResponse = await googlePhoto(apiKey, photoName);

  if (!googleResponse.ok) {
    return new Response(await googleResponse.text(), {
      status: googleResponse.status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(googleResponse.body, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type":
        googleResponse.headers.get("Content-Type") ?? "image/jpeg",
      // A photo reference points at fixed image bytes, so edge and browser
      // caches can hold it for a year; `immutable` stops revalidation.
      "Cache-Control": `public, max-age=${ONE_YEAR_IN_SECONDS}, s-maxage=${ONE_YEAR_IN_SECONDS}, immutable`,
      "CDN-Cache-Control": `public, max-age=${ONE_YEAR_IN_SECONDS}`,
    },
  });
}