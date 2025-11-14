import { form, getRequestEvent, query } from "$app/server";
import { addMediasSchema } from "./media.schema";

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

function resizeImage(
  image: ImagesBinding,
  fileBuffer: ReadableStream<Uint8Array>,
  width: number,
) {
  return image
    .input(fileBuffer)
    .transform({ width })
    .output({ format: "image/webp" });
}

async function resizeAllFormats(fileBuffer: ReadableStream<Uint8Array>) {
  const image = await getCfImage();
  return Promise.all([
    resizeImage(image, fileBuffer, 1280),
    resizeImage(image, fileBuffer, 640),
    resizeImage(image, fileBuffer, 320),
  ]);
}

async function uploadToR2(
  images: { key: string; buffer: ReadableStream<Uint8Array> }[],
) {
  const bucket = await getBucket();

  return Promise.all(
    images.map(({ key, buffer }) =>
      bucket.put(key, buffer, {
        httpMetadata: {
          contentType: "image/webp",
          cacheControl: "public, max-age=31536000",
        },
      }),
    ),
  );
}

export const addMedias = form(addMediasSchema, async (data, invalid) => {
  try {
    for (const file of data.files) {
      const fileBuffer =
        (await file.arrayBuffer()) as unknown as ReadableStream<Uint8Array>;
      const formats = (await resizeAllFormats(fileBuffer)).map((f) =>
        f.response(),
      );

      const [buffer1280, buffer640, buffer320] = await Promise.all(
        formats.map(
          (f) => f.arrayBuffer() as unknown as ReadableStream<Uint8Array>,
        ),
      );

      const uuid = crypto.randomUUID();
      const imagesToUpload = [
        {
          key: `large-${uuid}.webp`,
          buffer: buffer1280,
        },
        {
          key: `medium-${uuid}.webp`,
          buffer: buffer640,
        },
        {
          key: `thumbnail-${uuid}.webp`,
          buffer: buffer320,
        },
      ];
      await uploadToR2(imagesToUpload);
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
  return medias.objects
    .filter((media) => media.key?.startsWith("large-"))
    .map((l) => l.key.replace("large-", ""));
});
