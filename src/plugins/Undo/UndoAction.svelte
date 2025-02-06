<svelte:options customElement="undo-button" />

<script lang="ts">
  import UndoIcon from "../../../icons/arrow-go-back-line.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type Props from "../../../types/Props";

  let { editor, readonly }: Props = $props();

  const action = () => editor.chain().focus().undo().run();
</script>

{#if editor}
  <SimpleButton key="undo" {editor} {readonly} {action} icon={UndoIcon} />
{/if}
