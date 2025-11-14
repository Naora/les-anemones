import * as v from "valibot";

export const addMediasSchema = v.object({
  files: v.array(v.file("un fichier est requis.")),
});
