<script lang="ts">
  import type { Editor } from "@tiptap/core";

  import DeleteTableIcon from "../../../icons/delete-bin-2-line.svg?raw";
  import DeleteColumnIcon from "../../../icons/delete-column.svg?raw";
  import DeleteRowIcon from "../../../icons/delete-row.svg?raw";
  import InsertColumnLeftIcon from "../../../icons/insert-column-left.svg?raw";
  import InsertColumnRightIcon from "../../../icons/insert-column-right.svg?raw";
  import InsertRowTopIcon from "../../../icons/insert-row-top.svg?raw";
  import InsertRowBottomIcon from "../../../icons/insert-row-bottom.svg?raw";

  export let editor: Editor;
</script>

<div class="table-bubble-menu">
  <div class="table-toolbar">
    <div class="toolbar-button-group">
      <button on:click={() => editor.commands.toggleHeaderCell()}>
        Toggle Header
      </button>
      <button on:click={() => editor.commands.deleteTable()}>
        {@html DeleteTableIcon}
      </button>
    </div>
    <div class="toolbar-button-group">
      <button on:click={() => editor.commands.addRowBefore()}>
        {@html InsertRowTopIcon}
      </button>
      <button on:click={() => editor.commands.addRowAfter()}>
        {@html InsertRowBottomIcon}
      </button>
      <button on:click={() => editor.commands.deleteRow()}>
        {@html DeleteRowIcon}
      </button>
    </div>
    <div class="toolbar-button-group">
      <button on:click={() => editor.commands.addColumnBefore()}>
        {@html InsertColumnLeftIcon}
      </button>
      <button on:click={() => editor.commands.addColumnAfter()}>
        {@html InsertColumnRightIcon}
      </button>
      <button on:click={() => editor.commands.deleteColumn()}>
        {@html DeleteColumnIcon}
      </button>
    </div>
  </div>
</div>

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
          & svg {
            width: 1.125rem;
            height: 1.125rem;
            color: var(--icon-text-color);
          }
        }
      }
    }
  }
</style>
