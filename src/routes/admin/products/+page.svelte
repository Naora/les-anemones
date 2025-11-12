<script lang="ts">
import { getProducts } from "$lib/rpc/product.remote";
</script>

<svelte:head>
	<title>Admin - Produits</title>
</svelte:head>

<div class="p-4 bg-base-100 rounded-box">
  <div class="flex justify-end justify-between mb-4 gap-2">
    <a href="/admin/products/create" class="btn btn-primary">Ajouter</a>
  </div>

  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Prix</th>
          <th>Quantité en stock</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
	{#each await getProducts() as product}
          <tr>
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
</div>
