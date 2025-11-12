import type { DbInsertProduct, DbProduct } from "$lib/server/db/schema";
import * as tables from "$lib/server/db/schema";
import type { RequestEvent } from "@sveltejs/kit";
import { eq, inArray, sql } from "drizzle-orm";

export async function getAll(event: RequestEvent) {
  const rows = await event.locals.db.select().from(tables.products);
  return rows;
}

export async function getById(event: RequestEvent, id: string) {
  const row = await event.locals.db
    .select()
    .from(tables.products)
    .where(eq(tables.products.id, id))
    .limit(1)
    .get();
  return row;
}

export async function insert(event: RequestEvent, product: DbInsertProduct) {
  const [row] = await event.locals.db
    .insert(tables.products)
    .values(product)
    .returning();
  return row;
}

export async function update(event: RequestEvent, product: DbProduct) {
  const [row] = await event.locals.db
    .update(tables.products)
    .set(product)
    .where(eq(tables.products.id, product.id))
    .returning();
  return row;
}

export async function remove(event: RequestEvent, productIds: string[]) {
  await event.locals.db
    .delete(tables.products)
    .where(inArray(tables.products.id, productIds));
}

export async function addCategories(
  event: RequestEvent,
  product: DbProduct,
  categories: string[],
) {
  if (categories.length === 0) {
    return;
  }
  const {
    locals: { db },
  } = event;

  await db.transaction(async (tx) => {
    tx.insert(tables.categories)
      .values(categories.map((name) => ({ name })))
      .onConflictDoNothing()
      .returning();

    await tx.insert(tables.productCategories).select(
      db
        .select({
          productId: sql<string>`${product.id}`.as("productId"),
          categoryId: tables.categories.id,
        })
        .from(tables.categories)
        .where(inArray(tables.categories.name, categories)),
    );
  });
}

export async function updateCategories(
  event: RequestEvent,
  product: DbProduct,
  categories: string[],
) {
  const {
    locals: { db },
  } = event;

  await db
    .delete(tables.productCategories)
    .where(eq(tables.productCategories.productId, product.id));

  if (categories.length === 0) return;

  await db
    .insert(tables.categories)
    .values(categories.map((name) => ({ name })))
    .onConflictDoNothing()
    .returning();

  await db.insert(tables.productCategories).select(
    db
      .select({
        productId: sql<string>`${product.id}`.as("productId"),
        categoryId: tables.categories.id,
      })
      .from(tables.categories)
      .where(inArray(tables.categories.name, categories)),
  );
}
