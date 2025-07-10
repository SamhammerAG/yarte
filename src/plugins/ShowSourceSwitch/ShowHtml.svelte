<svelte:options customElement="yarte-show-html-button" />

<script lang="ts">
  import SimpleButton from "../../base/SimpleButton.svelte";
  import StrikeIcon from "../../../icons/strikethrough.svg?raw";
  import type { Editor } from "@tiptap/core";

  let { editor, language = "en" }: { editor: Editor; language: "de" | "en" } = $props();

  const translations: Record<string, string> = {
    de: "HTML anzeigen",
    en: "Show HTML",
  };

  //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
  const action = () => editor.value.commands.setContent(editor.value.getText());
</script>

{#if editor}
  <SimpleButton {editor} {action} key="source" icon={StrikeIcon} tooltip={translations[language]} />
{/if}
