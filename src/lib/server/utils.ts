import type { RequestEvent } from "@sveltejs/kit";

export const getCfBucket = (event: RequestEvent) => {
  const bucket = event.platform?.env?.BUCKET;

  if (!bucket) throw new Error("No bucket configured");
  return bucket;
};

export const getCfImage = (event: RequestEvent) => {
  const image = event.platform?.env?.IMAGES;

  if (!image) throw new Error("No Cloudflare Images configured");
  return image;
};

export const getCfDb = (event: RequestEvent) => {
  const db = event.locals.db;

  if (!db) throw new Error("Database connection is not available");
  return db;
};
