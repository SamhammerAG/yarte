<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import type { Action } from "../../types/Action";
  import type { Subaction } from "../../types/SubAction";

  import BaseDropdownButton from "./BaseDropdownButton.svelte";

  export let editor: Editor;
  export let disabled: boolean;
  export let activeButtons: string[];
  export let action: Action;

  function handleClick(subaction: Subaction) {
    subaction.buttonAction(editor);
  }

  function getSubactions(): Subaction[] {
    return action.subactions || [];
  }
</script>

<BaseDropdownButton {disabled} {activeButtons} {action}>
  <div slot="dropdown" class="dropdown">
    {#each getSubactions() as subaction}
      <button {disabled} on:click={() => handleClick(subaction)}>
        <img src={subaction.buttonIcon} alt={subaction.key} />
      </button>
    {/each}
  </div>
</BaseDropdownButton>
