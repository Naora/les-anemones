<script lang="ts">
import Checkbox from "$lib/components/Checkbox.svelte";
import Input from "$lib/components/Input.svelte";
import Textarea from "$lib/components/Textarea.svelte";
import TokenInput from "$lib/components/TokenInput.svelte";
import { updateProduct, getProduct } from "$lib/rpc/product.remote";

const { params } = $props();

const initial = await getProduct(params.id);
const { id, name, price, stock, description, categories, published } =
  updateProduct.fields;

name.set(initial.name);
price.set(initial.price);
stock.set(initial.stock);
description.set(initial.description);
published.set(initial.published ?? false);
</script>

<svelte:head>
	<title>Admin - Modifier un produit</title>
</svelte:head>

<div class="flex flex-col lg:flex-row justify-evenly gap-4">
  <form {...updateProduct} class="flex flex-col flex-1 bg-base-100 shadow-sm p-4 space-y-4 rounded-lg" >
    <legend class="fieldset-legend">Modifier un produit</legend>

    <Input {...name.as("text")} issues={name.issues()} label="Nom" class="w-full"  />

    <div class="flex flex-wrap gap-4">
      <Input {...price.as("number")} issues={price.issues()} step="0.01" label="€" />
      <Input {...stock.as("number")} issues={stock.issues()} label="Stock" />
    </div>

    <TokenInput {...categories.as("text")} label="Catégories" initial={initial.categories} />
    <Textarea {...description.as("text")} issues={description.issues()} class="w-full mb-4" />
    <Checkbox {...published.as("checkbox")} issues={published.issues()} label="Publié" /> 

    <input {...id.as("hidden", initial.id)} />

    <button type="submit" class="btn btn-primary w-fit">Modifier</button>
  </form>

</div>


