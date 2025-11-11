import { db } from "$lib/server/db";
import * as tables from "$lib/server/db/schema";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { FormProduct } from "../validate";
import * as productRepository from "$lib/server/db/product";
import * as v from "valibot";

export const load: PageServerLoad = async (event) => {
  const id = event.params.id;
  const conn = db(event);

  const rows = await conn
    .select()
    .from(tables.products)
    .where(eq(tables.products.id, id))
    .execute();
  if (rows.length === 0) {
    return error(404, { message: "Product not found" });
  }

  return { product: rows[0] };
};

function extractFormData(form: FormData) {
  const name = form.get("name");
  const price = form.get("price");
  const stock = form.get("stock");
  const description = form.get("description");
  const categories = form.getAll("categories");
  const published = form.get("published") === "on";
  return {
    name,
    price: price ? Number(price) : undefined,
    stock: stock ? Number(stock) : undefined,
    description,
    categories,
    published,
  };
}

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const id = event.params.id;
    const extracted = extractFormData(formData);
    const validation = v.safeParse(FormProduct, { id, ...extracted });

    if (!validation.success) {
      console.error("create product validation errors:", validation.issues);
      return fail(422, {
        message: validation.issues.map((i) => i.message).join(", "),
      });
    }

    const conn = db(event);
    const { categories, ...product } = validation.output;
    const row = await productRepository.update(conn, product);

    // If no categories were selected, redirect to products page
    if (!categories || categories.length === 0) {
      return redirect(303, "/admin/products");
    }

    await productRepository.addCategories(conn, row, categories);

    return redirect(303, "/admin/products");
  },
};
