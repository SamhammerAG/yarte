<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import type { Action } from "../../types/Action";

  export let editor: Editor;
  export let disabled: boolean;
  export let action: Action;

  let files: FileList;
  let input: HTMLInputElement;

  $: files, files?.length > 0 && processImages();

  function processImages() {
    for (const file of files) {
      action.buttonAction(editor, file);
    }

    input.value = "";
  }
</script>

<button {disabled} on:click={() => input.click()}>
  {@html action.buttonIcon}
</button>
<input {disabled} bind:files bind:this={input} type="file" accept="image/*" />

<style>
  input[type="file"] {
    display: none;
  }
</style>
