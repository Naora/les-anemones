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
  <a {href}  data-tip={label}>
    {@render children?.()}
    <span >{label}</span>
  </a>
</li>
