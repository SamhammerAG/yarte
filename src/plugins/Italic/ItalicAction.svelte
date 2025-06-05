<svelte:options customElement="yarte-italic-button" />

<script lang="ts">
  import SimpleButton from "../../base/SimpleButton.svelte";
  import ItalicIcon from "../../../icons/italic.svg?raw";
  import type { Editor } from "@tiptap/core";

  let { editor, language = "en" }: { editor: Editor, language: "de" | "en" } = $props();

  const translations: Record<string, string> = {
    "de": "Kursiv",
    "en": "Italic"
  };

  //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
  const action = () => editor.chain().focus().toggleItalic().run();
</script>

{#if editor}
  <SimpleButton key="italic" {editor} {action} icon={ItalicIcon} tooltip={translations[language]} />
{/if}
