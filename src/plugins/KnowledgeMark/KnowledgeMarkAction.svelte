<svelte:options customElement="yarte-knowledge-button" />

<script lang="ts">
  import SimpleButton from "../../base/SimpleButton.svelte";
  import KnowledgeIcon from "../../../icons/brain-line.svg?raw";
  import type { Editor } from "@tiptap/core";

  let { editor, language = "en" }: { editor: Editor, language: "de" | "en" } = $props();

  const translations: Record<string, string> = {
    "de": "Wissensmarkierung",
    "en": "Knowledge Mark"
  };

  const action = () => editor.chain().toggleKnowledgeMark().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="knowledge" icon={KnowledgeIcon} tooltip={translations[language]} />
{/if}
