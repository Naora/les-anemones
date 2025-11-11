<script lang="ts">
import type { HTMLFormAttributes } from "svelte/elements";
import Input from "$lib/components/Input.svelte";
import TokenInput from "$lib/components/TokenInput.svelte";
import Textarea from "$lib/components/Textarea.svelte";
import Checkbox from "$lib/components/Checkbox.svelte";
import { enhance } from "$app/forms";
import { FormProduct } from "./validate";
import * as v from "valibot";

interface Props extends HTMLFormAttributes {
  product?: v.InferOutput<typeof FormProduct>;
  action: string;
}

const { product, action, ...props }: Props = $props();

function formatPrice(event: Event) {
  const el = event.target as HTMLInputElement;
  el.value = parseFloat(el.value).toFixed(2);
}
</script>

<form {...props} use:enhance>
  <legend class="fieldset-legend">Ajouter un produit</legend>

  <Input class="w-full" label="Nom du produit" type="text" name="name" minlength={2} value={product?.name} required />

  <fieldset class="fieldset flex">
    <Input label="€" type="number" onchange={formatPrice} name="price" placeholder="10.00" value={product?.price} required />
    <Input label="En stock" type="number" name="stock" min={0} value={product?.stock} required />
  </fieldset>

  <TokenInput label="Catégories" name="categories" class="w-full" />

  <Textarea label="Description" name="description" class="w-full" value={product?.description} />

  <Checkbox label="Publié" name="published" checked={product?.published} />

  <button type="submit" class="btn btn-primary w-fit">{action}</button>
</form>
