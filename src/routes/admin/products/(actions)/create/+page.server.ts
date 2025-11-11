import { db } from "$lib/server/db";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import * as productRepository from "$lib/server/db/product";
import { FormNewProduct } from "../validate";
import * as v from "valibot";

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
    const extracted = extractFormData(formData);
    const validation = v.safeParse(FormNewProduct, extracted);

    if (!validation.success) {
      console.error("create product validation errors:", validation.issues);
      return fail(422, {
        message: validation.issues.map((i) => i.message).join(", "),
      });
    }

    const data = validation.output;
    const conn = db(event);
    const row = await productRepository.insert(conn, {
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

    await productRepository.addCategories(conn, row, data.categories);

    return redirect(303, "/admin/products");
  },
};
