<svelte:options customElement="yarte-underline-button" />

<script lang="ts">
  import SimpleButton from "../../base/SimpleButton.svelte";
  import UnderlineIcon from "../../../icons/underline.svg?raw";
  import type { Editor } from "@tiptap/core";

  let { editor }: { editor: Editor } = $props();

  let tooltip = "Underline";
  //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
  const action = () => editor.chain().focus().toggleUnderline().run();
</script>

{#if editor}
  <SimpleButton key="underline" {editor} {action} icon={UnderlineIcon} {tooltip} />
{/if}
