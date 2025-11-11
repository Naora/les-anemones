<script lang="ts">
interface Props {
  toggleSidebar: () => void;
}

const { toggleSidebar }: Props = $props();
</script>

<div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <button class="btn btn-ghost btn-circle" aria-label="open sidebar" onclick={toggleSidebar}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
    </button>
  </div>
  <div class="navbar-center">
    <a class="btn btn-ghost text-xl" href="/">daisyUI</a>
  </div>
  <div class="navbar-end">
  </div>
</div>
