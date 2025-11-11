<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";

interface Props extends HTMLInputAttributes {
  label?: string;
}
let { label, ...props }: Props = $props();
</script>

<label for={props.name} class="label">
  <input {...props} class="checkbox" type="checkbox" name="published" /> {label}
</label>
