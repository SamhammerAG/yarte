<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import BaseDropdownButton from "./BaseDropdownButton.svelte";
  import type { Action } from "../../types/Action";
  import EraserIcon from "../../icons/eraser-line.svg?raw";

  export let editor: Editor;
  export let disabled: boolean;
  export let activeButtons: string[];
  export let action: Action;

  const colors: string[] = [
    "#E91313",
    "#118800",
    "#63F963",
    "#72CDFD",
    "#fc7999",
    "#FDFD77",
  ];

  function clear() {
    if (action.buttonAction2) {
      action.buttonAction2(editor);
    }
  }
</script>

<BaseDropdownButton {disabled} {activeButtons} {action}>
  <div class="color-picker">
    <button class="clear" on:click={clear}> {@html EraserIcon} Clear</button>
    {#each colors as color}
      <button
        style="background-color: {color};"
        on:click={() => action.buttonAction(editor, color)}
      ></button>
    {/each}
  </div>
</BaseDropdownButton>

<style>
  .color-picker {
    display: flex;
    flex-flow: row wrap;
    gap: 0.25rem;
    width: 6.75rem;
    background-color: var(--toolbar-color);
    padding: 0.25rem;

    & button {
      border: none;
      border-radius: 0.3rem;
    }

    & .clear {
      width: 100%;
      text-align: center;
      padding: 0.5rem;
      background-color: var(--button-color);
      color: var(--icon-text-color);
      align-items: center;
      justify-content: center;
      display: flex;
      cursor: pointer;

      &:hover {
        background-color: var(--button-hover);
      }

      & svg {
        width: 1rem;
        height: 1rem;
      }
    }

    & button:not(.clear) {
      display: flex;
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid var(--icon-text-color);

      &:hover {
        transform: scale(1.25);
      }
    }
  }
</style>
