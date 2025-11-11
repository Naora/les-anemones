<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";

interface Props extends HTMLInputAttributes {
  initial?: string[];
  label?: string;
}
let { initial, label, ...props }: Props = $props();

let tokens: string[] = $state(initial ?? []);
let input: string = $state("");

function addToken() {
  const token = input.trim();
  if (token && !tokens.includes(token)) {
    tokens = [...tokens, token];
  }
  input = "";
}

function removeToken(index: number) {
  tokens = tokens.filter((_, i) => i !== index);
}

function onkeydown(e: KeyboardEvent) {
  if (e.key === "Backspace" && input === "" && tokens.length > 0) {
    removeToken(tokens.length - 1);
  }
  if (e.key === ";" || e.key === "Enter") {
    e.preventDefault();
    addToken();
  }
}
</script>

<div class="flex flex-wrap gap-2 mb-2">
  {#each tokens as token, index}
      <button type="button" class="btn btn-primary" onclick={() => removeToken(index)}>{token}</button>
  {/each}
</div>
<label class="input" for={props.name}>
  {#if label}<span class="label">{label}</span>{/if}
  <input
    type="text"
    bind:value={input}
    onchange={addToken}
    {onkeydown}
  />
  <input type="hidden" {...props} value={tokens.join(";")} />
</label>
