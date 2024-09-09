<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import Button from "./Button.svelte";
  import Actions from "./Actions";

  export let editor: Editor;
  export let toolbar: string[];
  export let disabled: boolean;
  export let activeButtons: string[] = [];

  function getConfiguredToolbarItems(): [string, Function][] {
    return Object.entries(Actions).filter(([key, _action]) =>
      toolbar.includes(key.toLowerCase()),
    );
  }
</script>

{#if editor}
  <div class="toolbar">
    {#each getConfiguredToolbarItems() as item}
      <Button
        {editor}
        {disabled}
        {activeButtons}
        key={item[0].toLowerCase()}
        action={item[1]}
      />
    {/each}
  </div>
{/if}

<style>
  .toolbar {
    background: #ccc;
    padding: 2px;
  }
</style>
