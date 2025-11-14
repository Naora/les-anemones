import { error, type RequestHandler } from "@sveltejs/kit";
import * as v from "valibot";
import { getRequestEvent } from "$app/server";

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
  const validation = v.safeParse(imageSchema, params);

  if (!validation.success) {
    console.error("Image params validation errors:", validation.issues);
    return error(400, { message: "Invalid image parameters" });
  }
  const data = validation.output;

  return event.fetch(`/images/${data.id}`, { cf: { image: { width: 300 } } });
};
