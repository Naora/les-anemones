<script lang="ts">
import PanelRight from "@lucide/svelte/icons/panel-right";

const { children } = $props();
</script>

<div class="drawer-side is-drawer-close:overflow-visible">
  <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
  <div class="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-100 flex flex-col items-start min-h-full">
    <ul class="menu w-full grow">
      {@render children?.()}
    </ul>
    <div class="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Open">
      <label for="my-drawer" class="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180">
        <PanelRight />
      </label>
    </div>
  </div>
</div>
