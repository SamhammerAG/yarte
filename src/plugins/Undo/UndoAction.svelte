<svelte:options customElement="undo-button" />

<script lang="ts">
  import UndoIcon from "../../../icons/arrow-go-back-line.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor }: { editor: Editor } = $props();

  //@ts-ignore
  const action = () => editor.chain().focus().undo().run();
</script>

{#if editor}
  <SimpleButton key="undo" {editor} {action} icon={UndoIcon} />
{/if}
