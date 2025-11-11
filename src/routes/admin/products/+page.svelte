<script lang="ts">
import type { PageProps } from "./$types";

const { data }: PageProps = $props();

let products = $state(data.products.map((p) => ({ ...p, selected: false })));

function toggleSelectAll(event: Event) {
  const el = event.target as HTMLInputElement;
  el.indeterminate = false;

  if (el.checked === false)
    products = products.map((p) => ({ ...p, selected: false }));
  else products = products.map((p) => ({ ...p, selected: true }));
}

function isIntermediateState() {
  const el = document.getElementById("select-all") as HTMLInputElement;
  el.indeterminate = true;
}
</script>

<svelte:head>
	<title>Admin - Produits</title>
</svelte:head>

<form method="POST" class="p-4 bg-base-100 rounded-box">
  <div class="flex justify-between mb-4 gap-2">
    <button class="btn btn-error" formaction="?/delete">Supprimer</button>
    <a href="/admin/products/create" class="btn btn-primary">Ajouter</a>
  </div>

  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>
            <label>
              <input id="select-all" type="checkbox" class="checkbox" onclick={toggleSelectAll} />
            </label>
          </th>
          <th>Nom</th>
          <th>Description</th>
          <th>Prix</th>
          <th>Quantité en stock</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
	{#each products as product}
          <tr>
            <th scope="row">
              <label>
                <input type="checkbox" class="checkbox" name="ids" value={product.id}  onclick={isIntermediateState} bind:checked={product.selected} />
              </label>
            </th>
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle h-12 w-12">
                    <!-- TODO: remplacer par product.image -->
                    <img
                      src="https://lipsum.app/128x128" 
                      alt="produit mit en avant" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{product.name}</div>
                </div>
              </div>
            </td>
            <td>
              {product.description}
            </td>
            <td>{product.price.toFixed(2)} €</td>
	    <td>{product.stock}</td>
            <th scope="row">
              <a href={`/admin/products/${product.id}`} class="btn btn-ghost btn-xs">modifier</a>
            </th>
          </tr>
    	{/each}
      </tbody>
    </table>
  </div>
</form>
