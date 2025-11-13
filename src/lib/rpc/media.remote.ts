import { setTimeout } from "node:timers/promises";
import { form } from "$app/server";
import { mediaSchema } from "../../../../lib/rpc/media.schemadmin/products/(actions)/media.schema";
import * as v from "valibot";

export const createMedia = form(mediaSchema, async (data) => {
  // Here you would add the logic to store the media file and its description in your database
  await setTimeout(1000);
  console.log("Media created:", data);
});

const uploadSchema = v.object({
  files: v.array(
    v.object({
      file: v.file(),
      description: v.pipe(v.string(), v.nonEmpty()),
    }),
  ),
});

export const uploadMedia = form(uploadSchema, async (data) => {
  console.log(data);
});
