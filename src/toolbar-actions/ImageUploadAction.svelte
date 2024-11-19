<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import SimpleButton from "./base/SimpleButton.svelte";
  import ImageIcon from "../../icons/image-add-line.svg?raw";

  interface Props {
    key: string;
    editor: Editor;
    disabled: boolean;
    activeButtons: string[];
    imageUpload: (file: File) => Promise<string>;
  }

  let { key, editor, disabled, activeButtons, imageUpload }: Props = $props();

  // svelte-ignore non_reactive_update
  let files: FileList;
  let input: HTMLInputElement;

  function processImages() {
    for (const file of files) {
      imageUpload(file).then((imageSrc: string) =>
        editor.chain().focus().setImage({ src: imageSrc }).run(),
      );
    }

    input.value = "";
  }
  $effect(() => {
    files?.length > 0 && processImages();
  });
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
