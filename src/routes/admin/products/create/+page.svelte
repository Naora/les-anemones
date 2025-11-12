<script lang="ts">
import Checkbox from "$lib/components/Checkbox.svelte";
import Input from "$lib/components/Input.svelte";
import InputText from "$lib/components/InputText.svelte";
import Textarea from "$lib/components/Textarea.svelte";
import TokenInput from "$lib/components/TokenInput.svelte";
import { createProduct } from "$lib/rpc/product.remote";
import type { RemoteFormField, RemoteFormFieldValue } from "@sveltejs/kit";

const { name, price, stock, description, categories, published } =
  createProduct.fields;
</script>

<svelte:head>
	<title>Admin - Ajouter un produit</title>
</svelte:head>

<div class="flex flex-col lg:flex-row justify-evenly gap-4">
  <form {...createProduct} class="flex flex-col flex-1 bg-base-100 shadow-sm p-4 space-y-4 rounded-lg" >
    <legend class="fieldset-legend">Ajouter un produit</legend>

    <InputText field={name} label="Nom" class="w-full"  />
    <input {...name.as("text")} class="input w-full" />

    <div class="flex flex-wrap gap-4">
      <Input {...price.as("number")} issues={price.issues()} step="0.01" label="€" />
      <Input {...stock.as("number")} issues={stock.issues()} label="Stock" />
    </div>

    <TokenInput {...categories.as("text")} label="Catégories" />
    <Textarea {...description.as("text")} class="w-full mb-4" />
    <Checkbox {...published.as("checkbox")} issues={published.issues()} label="Publié"  />

    <button type="submit" class="btn btn-primary w-fit">Ajouter</button>
  </form>

</div>
