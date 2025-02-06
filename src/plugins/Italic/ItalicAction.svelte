<svelte:options customElement="italic-button" />

<script lang="ts">
  import SimpleButton from "../../base/SimpleButton.svelte";
  import ItalicIcon from "../../../icons/italic.svg?raw";
  import type Props from "../../../types/Props";

  let { editor, readonly }: Props = $props();

  const action = () => editor.chain().focus().toggleItalic().run();
</script>

{#if editor}
  <SimpleButton key="italic" {editor} {readonly} {action} icon={ItalicIcon} />
{/if}
