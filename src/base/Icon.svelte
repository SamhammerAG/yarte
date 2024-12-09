<script lang="ts">
  import DOMPurify from "dompurify";

  interface Props {
    content: string;
  }

  let { content = $bindable() }: Props = $props();
</script>

<div>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html DOMPurify.sanitize(content, { USE_PROFILES: { svg: true } })}
</div>

<style>
  :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--icon-text-color);
  }
</style>
