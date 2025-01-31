<svelte:options customElement="image-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import ImageIcon from "../../../icons/image-add-line.svg?raw";

  interface Props {
    editor: Editor;
    imageUpload: (file: File) => Promise<string>;
  }

  let { editor, imageUpload }: Props = $props();

  //svelte-ignore non_reactive_update
  let input: HTMLInputElement;
  let active = $state(false);

  function processImages(e: Event) {
    const target = e.target as HTMLInputElement;

    for (const file of target.files ?? []) {
      imageUpload(file).then((imageSrc: string) => editor.chain().focus().setImage({ src: imageSrc }).run());
    }

    input.value = "";
  }
</script>

{#if editor}
  <SimpleButton key="image" {editor} action={() => input.click()} icon={ImageIcon} />
  <input disabled={active} onchange={processImages} bind:this={input} type="file" accept="image/*" />
{/if}

<style>
  input[type="file"] {
    display: none;
  }
</style>
