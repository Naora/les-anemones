<script lang="ts">
import Issues from "$lib/components/Issues.svelte";
import TokenInput from "$lib/components/TokenInput.svelte";
import { createProduct } from "$lib/rpc/product.remote";

const { name, price, stock, description, categories, published } =
  createProduct.fields;
</script>

<svelte:head>
	<title>Admin - Ajouter un produit</title>
</svelte:head>

<section class="w-full">
  <h1>Ajouter un produit</h1>

  <form {...createProduct} >
    <div class="flex direction-column margin-end-space">
      <label for="name">Nom</label>
      <Issues issues={name.issues()} />
      <input {...name.as("text")} />
    </div>

    <div class="flex direction-column margin-end-space">
      <label for="name">Prix</label>
      <Issues issues={price.issues()} />
      <input {...price.as("number")} step="0.01" />
    </div>
    <div class="flex direction-column margin-end-space">
      <label for="name">Stock</label>
      <Issues issues={stock.issues()} />
      <input {...stock.as("number")} />
    </div>
    
    <TokenInput {...categories.as("text")} label="Catégories" />

    <label for="description">Description</label>
    <textarea {...description.as("text")} ></textarea>
    <label for="published" class="margin-end-space">
      <input {...published.as("checkbox" )} />
      Publié
    </label>

    <button type="submit">Ajouter</button>
  </form>
</section>


