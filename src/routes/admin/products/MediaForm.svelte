<script lang="ts">
import Input from "$lib/components/Input.svelte";
import { createMedia } from "$lib/rpc/media.remote";
import { mediaSchema } from "$lib/rpc/media.schema";

const { file, description } = createMedia.fields;
</script>


<form {...createMedia.preflight(mediaSchema)} class="flex flex-col bg-base-100 shadow-sm p-4 gap-4" enctype="multipart/form-data"> 
  <div class="flex flex-col">
    <input  {...file.as("file")} accept="image/*" class="file-input" multiple />
    {#each file.issues() as issue}
      <span class="mb-2 text-sm text-error">
          <p>{issue.message}</p>
      </span>
    {/each}
  </div>

  <Input {...description.as("text")} />
  {#each description.issues() as issue}
    <div class="alert alert-error mt-2 mb-2 shadow">
        <p>{issue.message}</p>
    </div>
  {/each}

  <button class="btn btn-primary">Envoyer</button>
</form>
