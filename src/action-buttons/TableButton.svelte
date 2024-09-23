<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import BaseDropdownButton from "./BaseDropdownButton.svelte";
  import type { Action } from "../../types/Action";

  export let editor: Editor;
  export let disabled: boolean;
  export let activeButtons: string[];
  export let action: Action;

  const tableGridSize: number = 10;
  let xPos: number = 0;
  let yPos: number = 0;
</script>

<BaseDropdownButton {disabled} {activeButtons} {action}>
  <div class="table">
    {#each Array.from({ length: tableGridSize }).keys() as x}
      {#each Array.from({ length: tableGridSize }).keys() as y}
        <button
          class:highlight={xPos >= x && yPos >= y}
          on:mouseenter={() => ((xPos = x), (yPos = y))}
          on:click={() => action.buttonAction(editor, x + 1, y + 1)}
        ></button>
      {/each}
    {/each}
  </div>
  <div class="display">{xPos} x {yPos}</div>
</BaseDropdownButton>

<style>
  .table {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    gap: 0.125rem;
    padding: 0.5rem;

    & button {
      width: 1rem;
      height: 1rem;
      background-color: var(--button-color);
      border: none;

      &:hover,
      &.highlight {
        background-color: var(--button-active);
      }
    }
  }

  .display {
    text-align: center;
    color: var(--icon-text-color);
    padding-bottom: 0.25rem;
  }
</style>
