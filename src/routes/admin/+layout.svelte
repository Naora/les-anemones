<script lang="ts">
import Sidebar from "$lib/components/Sidebar.svelte";
import Header from "$lib/components/Header.svelte";
import SidebarItem from "$lib/components/SidebarItem.svelte";
import Home from "@lucide/svelte/icons/home";
import Box from "@lucide/svelte/icons/box";
import Blocks from "@lucide/svelte/icons/blocks";
import Users from "@lucide/svelte/icons/users";
import Truck from "@lucide/svelte/icons/truck";
import { onNavigate } from "$app/navigation";

let { children } = $props();

let sidebarOpen = $state(false);

onNavigate(() => {
  sidebarOpen = false;
});

function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
}
</script>

<div class="drawer lg:drawer-open bg-base-200">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={sidebarOpen} />
  <div class="drawer-content">
    <Header toggleSidebar={toggleSidebar} >
    </Header>
    <main class="p-4 container mx-auto">
      {@render children?.()}
    </main>
  </div>
  <Sidebar>
    <SidebarItem href="/admin/products" label="Produit" ><Box /></SidebarItem>
    <SidebarItem href="/admin/categories" label="Categories"><Blocks /></SidebarItem>
    <SidebarItem href="/admin/users" label="Utilisateurs"><Users /></SidebarItem>
    <SidebarItem href="/admin/orders" label="Commandes"><Truck /></SidebarItem>
    <SidebarItem href="/" label="Site"><Home /></SidebarItem>
  </Sidebar>
</div>


