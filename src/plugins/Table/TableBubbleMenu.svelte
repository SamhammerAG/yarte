<svelte:options customElement="table-bubble-menu" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";

  import DeleteTableIcon from "../../../icons/delete-bin-2-line.svg?raw";
  import DeleteColumnIcon from "../../../icons/delete-column.svg?raw";
  import DeleteRowIcon from "../../../icons/delete-row.svg?raw";
  import InsertColumnLeftIcon from "../../../icons/insert-column-left.svg?raw";
  import InsertColumnRightIcon from "../../../icons/insert-column-right.svg?raw";
  import InsertRowTopIcon from "../../../icons/insert-row-top.svg?raw";
  import InsertRowBottomIcon from "../../../icons/insert-row-bottom.svg?raw";
  import Icon from "../../base/Icon.svelte";

  let { editor }: { editor: Editor } = $props();
</script>

{#if editor}
  <div class="table-bubble-menu">
    <div class="table-toolbar">
      <div class="toolbar-button-group">
        <button onclick={() => editor.commands.toggleHeaderCell()}> Toggle Header </button>
        <button onclick={() => editor.commands.deleteTable()}>
          <Icon content={DeleteTableIcon} />
        </button>
      </div>
      <div class="toolbar-button-group">
        <button onclick={() => editor.commands.addRowBefore()}>
          <Icon content={InsertRowTopIcon} />
        </button>
        <button onclick={() => editor.commands.addRowAfter()}>
          <Icon content={InsertRowBottomIcon} />
        </button>
        <button onclick={() => editor.commands.deleteRow()}>
          <Icon content={DeleteRowIcon} />
        </button>
      </div>
      <div class="toolbar-button-group">
        <button onclick={() => editor.commands.addColumnBefore()}>
          <Icon content={InsertColumnLeftIcon} />
        </button>
        <button onclick={() => editor.commands.addColumnAfter()}>
          <Icon content={InsertColumnRightIcon} />
        </button>
        <button onclick={() => editor.commands.deleteColumn()}>
          <Icon content={DeleteColumnIcon} />
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .table-bubble-menu {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: var(--popout-border-radius);
    box-shadow:
      0 0 2px 0 rgba(34, 47, 62, 0.2),
      0 4px 8px 0 rgba(34, 47, 62, 0.15);
    min-width: 0;
    overflow: hidden;

    & .table-toolbar {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 4px 0;

      & .toolbar-button-group {
        display: flex;
        gap: 0.125rem;
        padding: 0 8px 0 10px;
        align-items: center;

        & button {
          cursor: pointer;
          margin: 6px 1px 5px 0;
          height: 28px;
          border: none;
          border-radius: var(--popout-border-radius);
          background-color: var(--button-color);

          &:hover {
            background-color: var(--button-hover);
          }
        }
      }
    }
  }
</style>
