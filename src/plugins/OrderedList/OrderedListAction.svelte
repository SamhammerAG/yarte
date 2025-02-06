<svelte:options customElement="ordered-list-button" />

<script lang="ts">
  import NumberedListIcon from "../../../icons/list-ordered.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type Props from "../../../types/Props";

  let { editor, readonly }: Props = $props();

  const action = () => editor.chain().focus().toggleOrderedList().run();
</script>

{#if editor}
  <SimpleButton {editor} {readonly} {action} key="ordered-list" icon={NumberedListIcon} />
{/if}
