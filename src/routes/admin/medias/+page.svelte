
<script lang="ts">
import { addMedias, getImages } from "$lib/rpc/media.remote";
import { addMediasSchema } from "$lib/rpc/media.schema";

const { files } = addMedias.fields;
// const images = await getImages();
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

<section class="grid-m margin-top-space">
  {#each await getImages() as image} 
    <div class="flex direction-column gap-2xs align-center">
      <img src="/images/{image.key}/thumbnail" alt="preview" class="media-thumbnail" loading="lazy" /> 
    </div> 
  {/each}

</section>


