<script lang="ts">
  import DOMPurify from "dompurify";

  interface IconProps {
    content: string;
  }

  let { content = $bindable() }: IconProps = $props();
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
