<svelte:options customElement="yarte-bold-button" />

<script lang="ts">
  import BoldIcon from "../../../icons/bold.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor, language = "en" }: { editor: Editor, language: "de" | "en" } = $props();

  const translations: Record<string, string> = {
    "de": "Fett",
    "en": "Bold"
  };

  //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
  const action = () => editor.chain().focus().toggleBold().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="bold" icon={BoldIcon} tooltip={translations[language]} />
{/if}
