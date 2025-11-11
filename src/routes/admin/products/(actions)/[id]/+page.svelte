<script lang="ts">
import ProductForm from "../ProductForm.svelte";

const { form, data } = $props();
</script>

<svelte:head>
	<title>Admin - Modifier un produit</title>
</svelte:head>

{#if form?.message}
  <div class="alert alert-error mb-4 mt-4 shadow">
    {form.message}
  </div>
{/if}

<ProductForm product={data.product} method="POST" class="flex flex-col bg-base-100 shadow-sm p-4 space-y-4 rounded-lg" action="Modifier" />
