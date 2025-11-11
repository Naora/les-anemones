import type { DbInsertProduct, DbProduct } from "$lib/server/db/schema";
import * as tables from "$lib/server/db/schema";
import type { Db } from "$lib/server/db";
import { eq, inArray, sql } from "drizzle-orm";

export async function insert(conn: Db, product: DbInsertProduct) {
  const [row] = await conn.insert(tables.products).values(product).returning();
  return row;
}

export async function update(conn: Db, product: DbProduct) {
  const [row] = await conn
    .update(tables.products)
    .set(product)
    .where(eq(tables.products.id, product.id))
    .returning();
  return row;
}

export async function addCategories(
  conn: Db,
  product: DbProduct,
  categories: string[],
) {
  if (categories.length === 0) {
    return;
  }

  // Insert the missing categories
  const test = conn
    .insert(tables.productCategories)
    .select(
      conn
        .select({
          productId: sql<string>`${product.id}`.as("productId"),
          categoryId: tables.categories.id,
        })
        .from(tables.categories)
        .where(inArray(tables.categories.name, categories)),
    )
    .toSQL();
  console.log(test);
}
