<svelte:options customElement="remove-format-button" />

<script lang="ts">
  import ClearIcon from "../../../icons/format-clear.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type Props from "../../../types/Props";

  let { editor, readonly }: Props = $props();

  const action = () => editor.chain().focus().unsetAllMarks().run();
</script>

{#if editor}
  <SimpleButton {editor} {readonly} {action} key="remove-format" icon={ClearIcon} />
{/if}
