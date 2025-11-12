import { form, getRequestEvent, query } from "$app/server";
import * as productRepository from "$lib/server/db/product";
import { error, redirect } from "@sveltejs/kit";
import {
  newProductSchema,
  productIdsSchema,
  productSchema,
} from "./product.schema";
import * as v from "valibot";
import { categories, productCategories, products } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const updateProduct = form(productSchema, async (data) => {
  const event = getRequestEvent();
  const row = await productRepository.update(event, {
    id: data.id,
    name: data.name,
    price: data.price,
    stock: data.stock,
    description: data.description,
    published: data.published ?? false,
  });

  const categories =
    data.categories
      ?.split(";")
      .map((name) => name.trim())
      .filter((n) => n !== "") ?? [];
  await productRepository.updateCategories(event, row, categories);

  return redirect(303, "/admin/products");
});

export const createProduct = form(newProductSchema, async (data) => {
  const event = getRequestEvent();
  const row = await productRepository.insert(event, {
    name: data.name,
    price: data.price,
    stock: data.stock,
    description: data.description,
    published: data.published,
  });

  // If no categories were selected, redirect to products page
  if (!data.categories || data.categories.length === 0) {
    return redirect(303, "/admin/products");
  }

  const categories =
    data.categories
      ?.split(";")
      .map((name) => name.trim())
      .filter((name) => name.length > 0) ?? [];
  await productRepository.addCategories(event, row, categories);

  return redirect(303, "/admin/products");
});

export const removeProducts = form(productIdsSchema, async (data) => {
  const event = getRequestEvent();
  await productRepository.remove(event, data.productIds);
});

export const getProducts = query(async () => {
  const event = getRequestEvent();
  const products = await productRepository.getAll(event);
  return products;
});

export const getProduct = query(
  v.pipe(v.string(), v.uuid()),
  async (productId: string) => {
    const {
      locals: { db },
    } = getRequestEvent();

    const pRows = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (pRows.length === 0) error(404, { message: "Product not found" });

    const cRows = await db
      .select({ name: categories.name })
      .from(categories)
      .innerJoin(
        productCategories,
        eq(productCategories.categoryId, categories.id),
      )
      .where(eq(productCategories.productId, productId));

    return { ...pRows[0], categories: cRows.map((c) => c.name) };
  },
);
