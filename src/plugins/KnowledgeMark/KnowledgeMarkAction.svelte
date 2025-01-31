<svelte:options customElement="knowledge-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import KnowledgeIcon from "../../../icons/brain-line.svg?raw";

  interface Props {
    editor: Editor;
  }

  let { editor }: Props = $props();

  const action = () => editor.chain().toggleKnowledgeMark().run();
</script>

{#if editor}
  <SimpleButton key="knowledge" {editor} {action} icon={KnowledgeIcon} />
{/if}
