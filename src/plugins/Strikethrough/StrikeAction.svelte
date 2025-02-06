<svelte:options customElement="strike-button" />

<script lang="ts">
  import SimpleButton from "../../base/SimpleButton.svelte";
  import StrikeIcon from "../../../icons/strikethrough.svg?raw";
  import type Props from "../../../types/Props";

  let { editor, readonly }: Props = $props();

  const action = () => editor.chain().focus().toggleStrike().run();
</script>

{#if editor}
  <SimpleButton {editor} {readonly} {action} key="strike" icon={StrikeIcon} />
{/if}
