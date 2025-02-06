<svelte:options customElement="redo-button" />

<script lang="ts">
  import RedoIcon from "../../../icons/arrow-go-forward-line.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type Props from "../../../types/Props";

  let { editor, readonly }: Props = $props();

  const action = () => editor.chain().focus().redo().run();
</script>

{#if editor}
  <SimpleButton {editor} {readonly} {action} key="redo" icon={RedoIcon} />
{/if}
