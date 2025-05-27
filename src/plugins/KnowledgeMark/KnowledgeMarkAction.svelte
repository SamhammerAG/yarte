<svelte:options customElement="yarte-knowledge-button" />

<script lang="ts">
  import SimpleButton from "../../base/SimpleButton.svelte";
  import KnowledgeIcon from "../../../icons/brain-line.svg?raw";
  import type { Editor } from "@tiptap/core";

  let { editor }: { editor: Editor } = $props();

  let tooltip = "Knowledge Mark";
  const action = () => editor.chain().toggleKnowledgeMark().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="knowledge" icon={KnowledgeIcon} {tooltip} />
{/if}
