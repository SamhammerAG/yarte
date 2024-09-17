<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import type { Action } from "./types/Action";
  import Button from "./Button.svelte";
  import ActionDefinitions from "./ActionDefinitions";

  export let editor: Editor;
  export let toolbar: string[];
  export let disabled: boolean;
  export let activeButtons: string[] = [];
  export let imageUpload: Function;

  function getConfiguredToolbarActions(): Action[] {
    return ActionDefinitions.getActions({ imageUpload }).filter(
      (action: Action) => {
        return toolbar.includes(action.key);
      },
    );
  }
</script>

<!-- ############################### <HTML> ############################## -->

{#if editor}
  <div class="toolbar">
    {#each getConfiguredToolbarActions() as action}
      <Button
        {editor}
        {disabled}
        {activeButtons}
        key={action.key}
        action={action.buttonAction}
        svgSrc="./icons/{action.buttonIcon}"
      />
    {/each}
  </div>
{/if}

<!-- ############################## </HTML> ############################## -->

<style>
  .toolbar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 10px;
    margin: 0;
    padding: 7px;
    font-family: "Inter", sans-serif;
    box-shadow: var(--shadow);
  }

  :global(.spacer) {
    min-width: 1px;
    width: 1px;
    background: var(--spacer);
  }

  :global(button) {
    display: flex;
    background-color: white;
    padding: 3px 6px 3px 6px;
    align-items: center;
    cursor: pointer;
    border: 0;
    border-radius: 3px;
    position: relative;
  }

  :global(.active:not([disabled])) {
    background: var(--selected);
    border: 0;
    box-shadow: none;
    color: #222f3e;
    position: relative;
  }

  :global(button img) {
    width: 22px;
    height: 22px;
  }

  :global(button:hover),
  :global(button:focus) {
    background-color: var(--hover);
  }
</style>
