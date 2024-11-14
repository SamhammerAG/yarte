<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import DropdownButton from "./base/DropdownButton.svelte";
  import TableIcon from "../../icons/table-line.svg?raw";

  interface Props {
    key: string;
    editor: Editor;
    disabled: boolean;
    activeButtons: string[];
  }

  let {
    key,
    editor,
    disabled,
    activeButtons
  }: Props = $props();
  let active = $state(false);
  

  const tableGridSize: number = 10;
  let xPos: number = $state(0);
  let yPos: number = $state(0);

  function createTable(rows: number, cols: number) {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
    active = false;
  }
</script>

<DropdownButton {key} {disabled} {activeButtons} icon={TableIcon} bind:active>
  <div class="table">
    {#each Array.from({ length: tableGridSize }).keys() as x}
      {#each Array.from({ length: tableGridSize }).keys() as y}
        <button
          class:highlight={xPos >= x && yPos >= y}
          onmouseenter={() => ((xPos = x), (yPos = y))}
          onclick={() => createTable(x + 1, y + 1)}
></button>
      {/each}
    {/each}
  </div>
  <div class="display">{xPos + 1} x {yPos + 1}</div>
</DropdownButton>

<style>
  .table {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);

    & button {
      border-color: #eee;
      border-style: solid;
      border-width: 0 1px 1px 0;
      box-sizing: border-box;
      width: 1rem;
      height: 1rem;
      background-color: var(--button-color);

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
