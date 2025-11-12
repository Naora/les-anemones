<script lang="ts">
import type { RemoteFormIssue } from "@sveltejs/kit";
import type { HTMLInputAttributes } from "svelte/elements";

interface Props extends HTMLInputAttributes {
  label?: string;
  issues?: RemoteFormIssue[];
}
let { label, issues, ...props }: Props = $props();
</script>

<label class="input" for={props.name}>
  {#if label}<span class="label">{label}</span>{/if}
  <input {...props} />
  {#each issues as issue}
    <span class="mt-2 text-sm text-error">
      <p>{issue.message}</p>
    </span>
  {/each}
</label>
