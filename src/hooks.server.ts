import { sequence } from "@sveltejs/kit/hooks";
import { initDb } from "$lib/server/db";

const dbHook = async ({ event, resolve }) => {
  event.locals.db = initDb(event);
  return resolve(event);
};

export const handle = sequence(dbHook);
