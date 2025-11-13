<script lang="ts">
import Input from "$lib/components/Input.svelte";
import { createMedia } from "$lib/rpc/media.remote";
import { mediaSchema } from "$lib/rpc/media.schema";

const { file, description } = createMedia.fields;
</script>


<form {...createMedia.preflight(mediaSchema)} > 
  <div >
    <input  {...file.as("file")} accept="image/*"  multiple />
    {#each file.issues() as issue}
      <span >
          <p>{issue.message}</p>
      </span>
    {/each}
  </div>

  <Input {...description.as("text")} />
  {#each description.issues() as issue}
    <div >
        <p>{issue.message}</p>
    </div>
  {/each}

  <button >Envoyer</button>
</form>
