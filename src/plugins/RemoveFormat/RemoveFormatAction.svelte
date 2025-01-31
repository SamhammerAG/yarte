<svelte:options customElement="remove-format-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import ClearIcon from "../../../icons/format-clear.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";

  interface Props {
    editor: Editor;
  }

  let { editor }: Props = $props();

  const action = () => editor.chain().focus().unsetAllMarks().run();
</script>

{#if editor}
  <SimpleButton key="remove-format" {editor} {action} icon={ClearIcon} />
{/if}
