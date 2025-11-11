<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
  href: string;
  label: string;
  children: Snippet;
}

const { href, label, children }: Props = $props();
</script>


<li>
  <a {href} class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip={label}>
    {@render children?.()}
    <span class="is-drawer-close:hidden">{label}</span>
  </a>
</li>
