<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import ImageIcon from "../../../icons/image-add-line.svg?raw";

  interface Props {
    key: string;
    editor: Editor;
    disabled: boolean;
    activeButtons: string[];
    customProperties: { imageUpload: (file: File) => Promise<string> };
  }

  let { key, editor, disabled, activeButtons, customProperties }: Props =
    $props();

  let input: HTMLInputElement;

  function processImages(e: Event) {
    const target = e.target as HTMLInputElement;

    console.log(target.files);

    for (const file of target.files ?? []) {
      console.log(file);
      customProperties
        .imageUpload(file)
        .then((imageSrc: string) =>
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
<input
  {disabled}
  onchange={processImages}
  bind:this={input}
  type="file"
  accept="image/*"
/>

<style>
  input[type="file"] {
    display: none;
  }
</style>
