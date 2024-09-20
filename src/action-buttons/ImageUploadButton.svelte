<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import type { Action } from "../../types/Action";

  let files: FileList;
  let input: HTMLInputElement;

  $: if (files) {
    for (const file of files) {
      action.buttonAction(editor, file);
    }
    input.value = "";
  }

  export let editor: Editor;
  export let disabled: boolean;
  export let action: Action;
</script>

<label for="image-upload" class="custom-file-upload">
  <img src={action.buttonIcon} alt={action.key} />
</label>
<input
  {disabled}
  id="image-upload"
  bind:files
  bind:this={input}
  type="file"
  accept="image/*"
/>

<style>
  input[type="file"] {
    display: none;
  }

  .custom-file-upload {
    display: flex;
    background-color: white;
    padding: 3px 6px 3px 6px;
    align-items: center;
    cursor: pointer;
    border: 0;
    border-radius: 3px;
    position: relative;
  }

  img {
    width: 22px;
    height: 22px;
  }
</style>
