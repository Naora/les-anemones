<script lang="ts">
import { addMedias, getImages } from "$lib/rpc/media.remote";
import { addMediasSchema } from "$lib/rpc/media.schema";

const { files } = addMedias.fields;
</script>


{#each files.issues() as issue}
  <div class="callout danger">
      {issue.message}
  </div>
{/each}

<form {...addMedias.preflight(addMediasSchema)} class="flex align-center justify-between gap-xs" enctype="multipart/form-data"> 
  <div class="flex direction-column gap-4xs">
    <input {...files.as("file multiple")} accept="image/*" />
  </div>

  <button>Envoyer</button>
</form>

<section class="grid-auto">
  {#await getImages()}
    <div>Chargement des images...</div>
  {:then images}
    {#each images as image} 
        <img src="/images/{image}/thumbnail" alt="preview" class="media-thumbnail" loading="lazy" /> 
    {/each}
  {:catch}
    <div class="callout warning">
      Impossible de charger les images.
    </div>
  {/await}

</section>


