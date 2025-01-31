<svelte:options customElement="bold-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import BoldIcon from "../../../icons/bold.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";

  interface Props {
    editor: Editor;
  }

  let { editor = $bindable() }: Props = $props();

  const action = () => editor.chain().focus().toggleBold().run();
</script>

{#if editor}
  <SimpleButton key="bold" {editor} {action} icon={BoldIcon} />
{/if}
