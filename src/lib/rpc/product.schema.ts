import * as v from "valibot";

export const newProductSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Le nom du produit est requis.")),
  price: v.pipe(
    v.number(),
    v.minValue(0, "Le prix doit être un nombre entier."),
  ),
  stock: v.pipe(
    v.number(),
    v.integer("Le stock doit être un nombre entier."),
    v.minValue(0, "La quantité en stock doit être un entier positif."),
  ),
  description: v.pipe(
    v.string(),
    v.minLength(1, "La description du produit est requise."),
  ),
  categories: v.optional(v.string()),
  published: v.optional(v.boolean()),
});

export const productSchema = v.object({
  id: v.pipe(v.string(), v.uuid("L'identifiant du produit est invalide.")),
  ...newProductSchema.entries,
});

export const productIdsSchema = v.object({
  productIds: v.array(
    v.pipe(v.string(), v.uuid("L'identifiant du produit est invalide.")),
  ),
});
