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
  {#each getSubactions() as subaction}
    <button {disabled} on:click={() => handleClick(subaction)}>
      {@html subaction.buttonIcon}
    </button>
  {/each}
</BaseDropdownButton>

<style>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--button-color);
    border: none;
    cursor: pointer;
    padding: 0.625rem;

    &:not(:last-child) {
      margin-bottom: 0.25rem;
    }

    &:hover {
      background-color: var(--button-hover);
    }

    & svg {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--icon-text-color);
    }
  }
</style>
