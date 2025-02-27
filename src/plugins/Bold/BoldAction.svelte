<svelte:options customElement="bold-button" />

<script lang="ts">
  import BoldIcon from "../../../icons/bold.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor }: { editor: Editor } = $props();
  //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
  const action = () => editor.chain().focus().toggleBold().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="bold" icon={BoldIcon} />
{/if}
