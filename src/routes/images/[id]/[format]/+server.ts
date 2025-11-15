import { getRequestEvent } from "$app/server";
import { getCfBucket } from "$lib/server/utils";
import { error, type RequestHandler } from "@sveltejs/kit";
import * as v from "valibot";

const imageSchema = v.object({
  id: v.string(),
  format: v.enum({
    thumbnail: "thumbnail",
    medium: "medium",
    large: "large",
  }),
});

export const GET: RequestHandler = async ({ params }) => {
  const event = getRequestEvent();
  const bucket = getCfBucket(event);
  const validation = v.safeParse(imageSchema, params);

  if (!validation.success) {
    console.error("Image params validation errors:", validation.issues);
    return error(400, { message: "Invalid image parameters" });
  }
  const data = validation.output;

  const file = await bucket.get(`${data.format}-${data.id}`);
  if (!file) return error(404, { message: "File not found" });

  const response = new Response(file.body, {
    headers: {
      "Content-Type":
        file.httpMetadata?.contentType || "application/octet-stream",
      "Cache-Control":
        file.httpMetadata?.cacheControl || "public, max-age=31536000",
      "Content-Length": file.size.toString(),
    },
  });

  return response;
};
