import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";
import type { RequestEvent } from "@sveltejs/kit";

export function db(event?: RequestEvent): DrizzleD1Database<typeof schema> {
  const db = event?.platform?.env.DB;
  if (!db) throw new Error("Database connection is not available");
  return drizzle(db, { schema });
}

export type Db = ReturnType<typeof db>;
