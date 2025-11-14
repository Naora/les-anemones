<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";

const { children, ...props }: HTMLAttributes<EventTarget> = $props();
</script>


<nav {...props} >
  <div class="margin-start-3xl show-above-m">
    <ul class="list-unstyled stack gap-2xs">
      {@render children?.()}
    </ul>
  </div>
  <div class="callout margin-end-3xl hide-above-m">
    <details>
      <summary>Actions</summary>
      <ul class="list-unstyled">
        {@render children?.()}
      </ul>
    </details>
  </div>
</nav>
