<script lang="ts">
import Issues from "$lib/components/Issues.svelte";
import TokenInput from "$lib/components/TokenInput.svelte";
import { updateProduct, getProduct } from "$lib/rpc/product.remote";
import { productSchema } from "$lib/rpc/product.schema.js";

const { params } = $props();
const product = await getProduct(params.id);
const { id, name, price, stock, description, categories, published } =
  updateProduct.fields;
</script>

<svelte:head>
	<title>Admin - Modifier un produit</title>
</svelte:head>

<section class="w-full">
  <h1>Modifier un produit</h1>

  <form {...updateProduct.preflight(productSchema)} >
    <div class="flex direction-column margin-end-space">
      <label for="name">Nom</label>
      <Issues issues={name.issues()} />
      <input {...name.as("text")} value={product.name} />
    </div>

    <div class="grid-m margin-end-space align-end">
      <div class="flex direction-column item-half">
	<label for="name">Prix</label>
	<Issues issues={price.issues()} />
	<input {...price.as("number")} step="0.01" value={product.price} />
      </div>
      <div class="flex direction-column item-half">
	<label for="name">Stock</label>
	<Issues issues={stock.issues()} />
	<input {...stock.as("number")} value={product.stock} />
      </div>
    </div>
    
    <TokenInput {...categories.as("text")} label="Catégories" initial={product.categories} />

    <label for="description">Description</label>
    <textarea {...description.as("text")} value={product.description}></textarea>
    <label for="published" class="margin-end-space">
      <input {...published.as("checkbox" )} value={product.published}/>
      Publié
    </label>
    
    <input {...id.as("hidden", product.id)} />

    <button type="submit">Modifier</button>
  </form>
</section>
