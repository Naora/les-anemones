<script lang="ts">
import Sidebar from "$lib/components/Sidebar.svelte";
import Header from "$lib/components/Header.svelte";
import Home from "@lucide/svelte/icons/home";
import Images from "@lucide/svelte/icons/images";
import Box from "@lucide/svelte/icons/box";
import Blocks from "@lucide/svelte/icons/blocks";
import Users from "@lucide/svelte/icons/users";
import Truck from "@lucide/svelte/icons/truck";

let { children } = $props();
</script>

<Header />

{#snippet link(href: string, Icon:any, text: string)}
  <li><a class="link-subtle flex gap-m align-center" href={href}><Icon />{text}</a></li>
{/snippet}

<div class="grid-m container-xl">
<Sidebar class="item-fourth flex direction-column">
  {@render link("/admin/products", Box, "Produits")}
  {@render link("/admin/categories", Blocks, "Categories")}
  {@render link("/admin/medias", Images, "Médias")}
  {@render link("/admin/users", Users, "Utilisateurs")}
  {@render link("/admin/orders", Truck, "Commandes")}
  {@render link("/", Home, "Site")}
</Sidebar>

<main class="item-three-fourths padding-3xl">
  {@render children?.()}
</main>
</div>

