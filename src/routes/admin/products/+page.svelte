<script lang="ts">
import { getProducts } from "$lib/rpc/product.remote";
</script>

<svelte:head>
	<title>Admin - Produits</title>
</svelte:head>

<div >
  <div>
    <a class="btn primary" href="/admin/products/create" >Ajouter</a>
  </div>

  <div class="scroll-horizontal" >
    <table >
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
              <div >
                <div >
                  <div >
                    <!-- TODO: remplacer par product.image -->
                    <img
                      src="https://lipsum.app/128x128" 
                      alt="produit mit en avant" />
                  </div>
                </div>
                <div>
                  <div >{product.name}</div>
                </div>
              </div>
            </td>
            <td>
              {product.description}
            </td>
            <td>{product.price.toFixed(2)} €</td>
	    <td>{product.stock}</td>
            <th scope="row">
              <a href={`/admin/products/${product.id}`} >modifier</a>
            </th>
          </tr>
    	{/each}
      </tbody>
    </table>
  </div>
</div>
