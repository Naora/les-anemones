<script lang="ts">
import Issues from "$lib/components/Issues.svelte";
import { addMedias } from "$lib/rpc/media.remote";
import { addMediasSchema } from "$lib/rpc/media.schema";

const { files } = addMedias.fields;
</script>


<form {...addMedias.preflight(addMediasSchema)} enctype="multipart/form-data"> 

  <input  {...files.as("file multiple")} accept="image/*" />
  <Issues issues={files.issues()} />

  <button >Envoyer</button>
</form>
