<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import type { Action } from "./types/Action";
  import Button from "./Button.svelte";
  import ActionDefinitions from "./ActionDefinitions";

  export let editor: Editor;
  export let toolbar: string[];
  export let disabled: boolean;
  export let activeButtons: string[] = [];

  function getConfiguredToolbarActions(): Action[] {
    return ActionDefinitions.getActions().filter((action: Action) => {
      return toolbar.includes(action.key);
    });
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
      />
    {/each}
  </div>
{/if}

<!-- ############################## </HTML> ############################## -->

<style>
  .toolbar {
    background: #ccc;
    padding: 2px;
  }
</style>
