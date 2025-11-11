import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { products } from "$lib/server/db/schema";
import { fail, type Actions } from "@sveltejs/kit";
import { inArray } from "drizzle-orm";
import * as v from "valibot";

const DeleteSchema = v.object({
  ids: v.array(v.pipe(v.string(), v.uuid("N'est pas un UUID valide"))),
});

export const load: PageServerLoad = async (event) => {
  const conn = db(event);
  const rows = await conn.select().from(products);
  return { products: rows };
};

export const actions: Actions = {
  delete: async (event) => {
    const formData = await event.request.formData();
    const ids = formData.getAll("ids");
    const validation = v.safeParse(DeleteSchema, { ids });
    if (!validation.success) {
      console.error("delete products error:", validation.issues);
      return fail(422, { message: validation.issues });
    }

    const conn = db(event);
    await conn
      .delete(products)
      .where(inArray(products.id, validation.output.ids));

    return { success: true };
  },
};
