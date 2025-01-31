<svelte:options customElement="redo-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import RedoIcon from "../../../icons/arrow-go-forward-line.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";

  interface Props {
    editor: Editor;
  }

  let { editor }: Props = $props();

  const action = () => editor.chain().focus().redo().run();
</script>

{#if editor}
  <SimpleButton key="redo" {editor} {action} icon={RedoIcon} />
{/if}
