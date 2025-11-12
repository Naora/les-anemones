<script lang="ts">
import type { RemoteFormIssue } from "@sveltejs/kit";
import type { HTMLInputAttributes } from "svelte/elements";

interface Props extends HTMLInputAttributes {
  label?: string;
  issues?: RemoteFormIssue[];
}
let { label, issues, ...props }: Props = $props();
</script>

<label for={props.name} class="label">
  <input {...props} class="checkbox" type="checkbox" name="published" /> {label}
  {#each issues as issue}
    <span class="mt-2 text-sm text-error">
      <p>{issue.message}</p>
    </span>
  {/each}
</label>
