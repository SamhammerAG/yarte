<svelte:options customElement="yarte-table-button" />

<script lang="ts">
  import DropdownButton from "../../base/DropdownButton.svelte";
  import TableIcon from "../../../icons/table-line.svg?raw";
  import type { Editor } from "@tiptap/core";

  let { editor, language = "en" }: { editor: Editor; language: "de" | "en" } = $props();

  const translations: Record<string, string> = {
    de: "Tabelle",
    en: "Table",
  };

  let dropdownOpen = $state(false);
  let rows: number = $state(0);
  let columns: number = $state(0);

  const tableGridSize: number = 10;

  function createTable(rows: number, cols: number) {
    //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
    dropdownOpen = false;
  }
</script>

{#if editor}
  <DropdownButton {editor} bind:dropdownOpen key="table" icon={TableIcon} tooltip={translations[language]}>
    <div class="table">
      {#each { length: tableGridSize }, x}
        {#each { length: tableGridSize }, y}
          <button
            class:highlight={rows >= x + 1 && columns >= y + 1}
            onmouseenter={() => ((rows = x + 1), (columns = y + 1))}
            onclick={() => createTable(rows, columns)}
            aria-label="Create table with {rows} rows and {columns} columns"
          ></button>
        {/each}
      {/each}
    </div>
    <div class="table-toolbar">
      <input name="rows" type="number" bind:value={rows} min="0" max="999" />
      <span>x</span>
      <input name="columns" type="number" bind:value={columns} min="0" max="999" />
      <button type="button" onclick={() => createTable(rows, columns)}>OK</button>
    </div>
  </DropdownButton>
{/if}

<style>
  .table {
    display: grid;
    width: 10rem;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);

    button {
      border-color: var(--font-light-color, #eee);
      border-style: solid;
      border-width: 0 1px 1px 0;
      box-sizing: border-box;
      width: 1rem;
      height: 1rem;
      background-color: var(--yarte-bg-button, white);

      &:hover,
      &.highlight {
        background-color: var(--yarte-bg-button-highlighted, #a6ccf7);
      }
    }
  }

  .table-toolbar {
    display: grid;
    width: 10rem;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 0.25rem;

    input {
      width: 3rem;
      text-align: center;
      box-sizing: border-box;
      appearance: default;

      /* Firefox */
      -moz-appearance: textfield;

      /* Chrome, Safari, Edge, Opera */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    span {
      width: 1rem;
      text-align: center;
    }

    button {
      width: 2.75rem;
      text-align: center;
      margin-left: 0.25rem;
    }
  }
</style>
