<script lang="ts">
import type { RemoteFormIssue } from "@sveltejs/kit";

interface Props {
  issues?: RemoteFormIssue[];
}
let { issues }: Props = $props();
</script>

{#each issues as issue}
  <div class="issue callout padding-4xs danger">
    {issue.message}
  </div>
{/each}

