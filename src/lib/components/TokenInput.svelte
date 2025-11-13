<script lang="ts">
interface Props {
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

  <label for={props.name}>
    {#if label}{label}{/if}
    <div class="flex wrap gap-5xs margin-end-2xs" >
      {#each tokens as token, index}
          <button type="button" class="primary"  onclick={() => removeToken(index)}>{token}</button>
      {/each}
    </div>
    <input
      type="text"
      bind:value={input}
      onchange={addToken}
      {onkeydown}
    />
    <input type="hidden" {...props} value={tokens.join(";")} />
  </label>

