<svelte:options customElement="italic-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import ItalicIcon from "../../../icons/italic.svg?raw";

  interface Props {
    editor: Editor;
  }

  let { editor }: Props = $props();

  const action = () => editor.chain().focus().toggleItalic().run();
</script>

{#if editor}
  <SimpleButton key="italic" {editor} {action} icon={ItalicIcon} />
{/if}
