<script lang="ts">
import type { RemoteFormField } from "@sveltejs/kit";
import type { HTMLInputAttributes } from "svelte/elements";

interface Props extends HTMLInputAttributes {
  label?: string;
  field: RemoteFormField<string>;
}
let { label, field, ...props }: Props = $props();
</script>

<div class="flex flex-col">
  <label class="input">
    {#if label}<span class="label">{label}</span>{/if}
    <input {...field.as("text")} {...props} />
  </label>
  {#each field.issues() as issue}
    <span class="mt-2 text-sm text-error">
      <p>{issue.message}</p>
    </span>
  {/each}
</div>
