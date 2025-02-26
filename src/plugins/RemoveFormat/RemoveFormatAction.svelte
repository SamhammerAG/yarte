<svelte:options customElement="remove-format-button" />

<script lang="ts">
  import ClearIcon from "../../../icons/format-clear.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor }: { editor: Editor } = $props();

  //@ts-ignore
  const action = () => editor.chain().focus().unsetAllMarks().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="remove-format" icon={ClearIcon} />
{/if}
