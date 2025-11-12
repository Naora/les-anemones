<script lang="ts" generics="T extends RemoteFormFieldValue">
import type { RemoteFormField, RemoteFormFieldValue } from "@sveltejs/kit";
import type { HTMLInputAttributes } from "svelte/elements";

interface Props extends HTMLInputAttributes {
  label?: string;
  field: RemoteFormField<T>;
}
let { label, field, type, ...props }: Props = $props();
field.as;
</script>

<div class="flex flex-col">
  <label class="input">
    {#if label}<span class="label">{label}</span>{/if}
    <input {...field.as("number")} {...props} />
  </label>
  {#each field.issues() as issue}
    <span class="mt-2 text-sm text-error">
      <p>{issue.message}</p>
    </span>
  {/each}
</div>
