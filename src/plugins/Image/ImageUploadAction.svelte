<svelte:options customElement="yarte-image-button" />

<script lang="ts">
  import SimpleButton from "../../base/SimpleButton.svelte";
  import ImageIcon from "../../../icons/image-add-line.svg?raw";
  import type { Editor } from "@tiptap/core";

  interface Props {
    editor: Editor;
    imageUpload: (file: File) => Promise<string>;
  }

  let { editor, imageUpload }: Props = $props();

  let tooltip = "Insert Image";
  //svelte-ignore non_reactive_update
  let input: HTMLInputElement;

  function processImages(e: Event) {
    const target = e.target as HTMLInputElement;

    for (const file of target.files ?? []) {
      imageUpload(file).then((imageSrc: string) => editor.chain().focus().setImage({ src: imageSrc }).run());
    }

    input.value = "";
  }
</script>

{#if editor}
  <SimpleButton {editor} key="image" action={() => input.click()} icon={ImageIcon} {tooltip} />
  <input onchange={processImages} bind:this={input} type="file" accept="image/*" />
{/if}

<style>
  input[type="file"] {
    display: none;
  }
</style>
