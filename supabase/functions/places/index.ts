import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { corsHeaders } from "./cors.ts";
import { nearbySearch } from "./nearby.ts";
import { handlePhoto } from "./photo.ts";
import { topAttractions } from "./topAttractions.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GOOGLE_PLACES_API_KEY is missing" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (req.method === "GET") {
    return handlePhoto(req, apiKey);
  }

  try {
    const body = await req.json();

    switch (body.action) {
      case "nearby":
        return nearbySearch(body);

      case "topAttractions":
        return topAttractions(body);

      default:
        return new Response(
          JSON.stringify({
            error: "Unsupported action",
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
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});