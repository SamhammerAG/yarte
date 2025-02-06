<svelte:options customElement="image-button" />

<script lang="ts">
  import SimpleButton from "../../base/SimpleButton.svelte";
  import ImageIcon from "../../../icons/image-add-line.svg?raw";
  import type Props from "../../../types/Props";

  interface ImageProps extends Props {
    imageUpload: (file: File) => Promise<string>;
  }

  let { editor, readonly, imageUpload }: ImageProps = $props();

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
  <SimpleButton {editor} {readonly} key="image" action={() => input.click()} icon={ImageIcon} />
  <input disabled={readonly} onchange={processImages} bind:this={input} type="file" accept="image/*" />
{/if}

<style>
  input[type="file"] {
    display: none;
  }
</style>
