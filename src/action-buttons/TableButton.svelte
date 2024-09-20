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
  <div slot="dropdown" class="dropdown">
    {#each Array.from({ length: tableGridSize }).keys() as x}
      {#each Array.from({ length: tableGridSize }).keys() as y}
        <button
          class:hover={xPos >= x && yPos >= y}
          on:mouseenter={() => ((xPos = x), (yPos = y))}
          on:click={() => action.buttonAction(editor, x + 1, y + 1)}
        ></button>
      {/each}
    {/each}
    <div></div>
  </div>
</BaseDropdownButton>

<!-- TODO -->
<style>
  .dropdown {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    gap: 0.25rem;
    padding: 0.5rem;
  }

  button {
    display: inline-block;
    min-width: 1rem;
    min-height: 1rem;
    border: 1px solid black;
  }

  button.hover {
    background-color: red;
  }
</style>
