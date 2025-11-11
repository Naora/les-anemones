<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";

interface Props extends HTMLInputAttributes {
  label?: string;
}
let { label, ...props }: Props = $props();
</script>

<label class="input" for={props.name}>
  {#if label}<span class="label">{label}</span>{/if}
  <input {...props} />
</label>
