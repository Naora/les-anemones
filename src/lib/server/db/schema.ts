import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  age: integer("age"),
});

export type DbUser = typeof users.$inferSelect;
export type DbInsertUser = typeof users.$inferInsert;

export const categories = sqliteTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
});

export type DbCategory = typeof categories.$inferSelect;
export type DbInsertCategory = typeof categories.$inferInsert;

export const productCategories = sqliteTable("product_categories", {
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});

export type DbProductCategory = typeof productCategories.$inferSelect;
export type DbInsertProductCategory = typeof productCategories.$inferInsert;

export const products = sqliteTable("products", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  stock: integer("stock").notNull(),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
});

export type DbProduct = typeof products.$inferSelect;
export type DbInsertProduct = typeof products.$inferInsert;
