import * as v from "valibot";

export const FormNewProduct = v.object({
  name: v.pipe(v.string(), v.minLength(1, "Le nom du produit est requis.")),
  price: v.pipe(
    v.number(),
    v.minValue(0, "Le prix doit être un nombre entier."),
  ),
  stock: v.pipe(
    v.number(),
    v.minValue(0, "Le stock doit être un nombre entier."),
  ),
  description: v.pipe(
    v.string(),
    v.minLength(1, "La description du produit est requise."),
  ),
  categories: v.optional(v.array(v.string())),
  published: v.boolean(),
});

export const FormProduct = v.object({
  id: v.pipe(v.string(), v.uuid("L'identifiant du produit est invalide.")),
  ...FormNewProduct.entries,
});
