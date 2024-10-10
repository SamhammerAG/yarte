<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import DropdownButton from "../toolbar-actions/base/DropdownButton.svelte";

  export let editor: Editor;
</script>

<div class="table-menu">
  <DropdownButton key="" disabled={false} activeButtons={[]} icon={""}>
    <button on:click={() => editor.commands.toggleHeaderColumn()}>
      Header Column
    </button>
    <button> Insert Column Left </button>
    <button> Insert Column Right </button>
    <button> Delete Column </button>
    <button> Select Column </button>
  </DropdownButton>
  <DropdownButton key="" disabled={false} activeButtons={[]} icon={""}>
    <button> Header Row </button>
    <button> Insert Row above </button>
    <button> Insert Row belove </button>
    <button> Delete Row </button>
    <button> Select Row </button></DropdownButton
  >
  <DropdownButton key="" disabled={false} activeButtons={[]} icon={""}
  ></DropdownButton>
</div>

<style>
  .table-menu {
    display: flex;
    flex-direction: row;
  }
</style>
