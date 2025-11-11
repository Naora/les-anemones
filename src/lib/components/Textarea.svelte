<script lang="ts">
import type { HTMLTextareaAttributes } from "svelte/elements";

interface Props extends HTMLTextareaAttributes {
  label?: string;
}

let { label, ...props }: Props = $props();
</script>

<fieldset class="fieldset">
  <legend class="fieldset-legend">{label}</legend>
  <textarea {...props} class={["textarea", props.class]}></textarea>
</fieldset>
