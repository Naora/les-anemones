import * as v from "valibot";

export const mediaSchema = v.object({
  description: v.pipe(
    v.string("doit être une chaîne de caractères."),
    v.nonEmpty("la description est requise."),
  ),
  file: v.file("un fichier est requis."),
});
