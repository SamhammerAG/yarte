<svelte:options customElement="yarte-table-button" />

<script lang="ts">
  import DropdownButton from "../../base/DropdownButton.svelte";
  import TableIcon from "../../../icons/table-line.svg?raw";
  import type { Editor } from "@tiptap/core";

  let { editor, language = "en" }: { editor: Editor, language: "de" | "en" } = $props();

  const translations: Record<string, string> = {
    "de": "Tabelle",
    "en": "Table"
  };

  let dropdownOpen = $state(false);
  let xPos: number = $state(0);
  let yPos: number = $state(0);

  const tableGridSize: number = 10;

  function createTable(rows: number, cols: number) {
    //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
    dropdownOpen = false;
  }
</script>

{#if editor}
  <DropdownButton {editor} {dropdownOpen} key="table" icon={TableIcon} tooltip={translations[language]}>
    <div class="table">
      {#each { length: tableGridSize }, x}
        {#each { length: tableGridSize }, y}
          <button
            class:highlight={xPos >= x && yPos >= y}
            onmouseenter={() => ((xPos = x), (yPos = y))}
            onclick={() => createTable(x + 1, y + 1)}
            aria-label="Create table with {x + 1} rows and {y + 1} columns"
          ></button>
        {/each}
      {/each}
    </div>
    <div class="display">{xPos + 1} x {yPos + 1}</div>
  </DropdownButton>
{/if}

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
      background-color: white;

      &:hover,
      &.highlight {
        background-color: #a6ccf7;
      }
    }
  }

  .display {
    text-align: center;
    color: black;
    padding-bottom: 0.25rem;
  }
</style>
