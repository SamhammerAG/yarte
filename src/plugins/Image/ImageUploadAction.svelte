<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import ImageIcon from "../../../icons/image-add-line.svg?raw";

  export let key: string;
  export let editor: Editor;
  export let disabled: boolean;
  export let activeButtons: string[];
  export let imageUpload: (file: File) => Promise<string>;

  let files: FileList;
  let input: HTMLInputElement;

  $: files, files?.length > 0 && processImages();

  function processImages() {
    for (const file of files) {
      imageUpload(file).then((imageSrc: string) =>
        editor.chain().focus().setImage({ src: imageSrc }).run(),
      );
    }

    input.value = "";
  }
</script>

<SimpleButton
  {key}
  {disabled}
  {activeButtons}
  action={() => input.click()}
  icon={ImageIcon}
/>
<input {disabled} bind:files bind:this={input} type="file" accept="image/*" />

<style>
  input[type="file"] {
    display: none;
  }
</style>
