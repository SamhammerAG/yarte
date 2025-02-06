<svelte:options customElement="bold-button" />

<script lang="ts">
  import BoldIcon from "../../../icons/bold.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type Props from "../../../types/Props";

  let { editor = $bindable(), readonly }: Props = $props();

  const action = () => editor.chain().focus().toggleBold().run();
</script>

{#if editor}
  <SimpleButton {editor} {readonly} {action} key="bold" icon={BoldIcon} />
{/if}
