import { error, type RequestHandler } from "@sveltejs/kit";
import { getBucket } from "$lib/rpc/media.remote";
import * as v from "valibot";

const imageSchema = v.object({
  id: v.string(),
});

export const GET: RequestHandler = async ({ params }) => {
  const bucket = await getBucket();
  const validation = v.safeParse(imageSchema, params);

  if (!validation.success) {
    console.error("Image params validation errors:", validation.issues);
    return error(400, { message: "Invalid image parameters" });
  }
  const data = validation.output;

  const file = await bucket.get(data.id);
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
