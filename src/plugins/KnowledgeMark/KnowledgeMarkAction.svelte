<svelte:options customElement="knowledge-button" />

<script lang="ts">
  import SimpleButton from "../../base/SimpleButton.svelte";
  import KnowledgeIcon from "../../../icons/brain-line.svg?raw";
  import type Props from "../../../types/Props";

  let { editor, readonly }: Props = $props();

  const action = () => editor.chain().toggleKnowledgeMark().run();
</script>

{#if editor}
  <SimpleButton {editor} {readonly} {action} key="knowledge" icon={KnowledgeIcon} />
{/if}
