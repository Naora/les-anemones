import { form, getRequestEvent, query } from "$app/server";
import { error } from "@sveltejs/kit";
import { addMediasSchema } from "./media.schema";
import * as v from "valibot";

export const getBucket = query((): R2Bucket => {
  const event = getRequestEvent();
  const bucket = event.platform?.env?.BUCKET;

  if (!bucket) throw new Error("No bucket configured");
  return bucket;
});

export const getCfImage = query((): ImagesBinding => {
  const event = getRequestEvent();
  const image = event.platform?.env?.IMAGES;

  if (!image) throw new Error("No Cloudflare Images configured");
  return image;
});

export const addMedias = form(addMediasSchema, async (data, invalid) => {
  const bucket = await getBucket();
  const image = await getCfImage();

  try {
    for (const file of data.files) {
      const fileBuffer =
        (await file.arrayBuffer()) as unknown as ReadableStream<Uint8Array>;
      const imageResponse = (
        await image
          .input(fileBuffer)
          .transform({ width: 1280 })
          .output({ format: "image/webp" })
      ).response();

      const uuid = crypto.randomUUID();
      const arrayBuffer = await imageResponse.arrayBuffer();
      bucket.put(`image-${uuid}.webp`, arrayBuffer, {
        httpMetadata: {
          contentType: "image/webp",
          cacheControl: "public, max-age=31536000",
        },
      });
    }
  } catch (e) {
    console.error("Error uploading media files:", e);
    return invalid(
      invalid.files(
        "Les images envoyé n'ont pas pu être tranformés. Essayer de renvoyer des fichiers plus petit.",
      ),
    );
  }

  return { success: true };
});

export const getMedias = query(async (): Promise<R2Objects> => {
  const bucket = await getBucket();
  const files = await bucket.list();

  return files;
});

export const getImages = query(async () => {
  const medias = await getMedias();
  return medias.objects.filter((media) => media.key?.startsWith("image-"));
});
