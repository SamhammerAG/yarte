<svelte:options customElement="yarte-ordered-list-button" />

<script lang="ts">
  import NumberedListIcon from "../../../icons/list-ordered.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor, language = "en" }: { editor: Editor, language: "de" | "en" } = $props();

  const translations: Record<string, string> = {
    "de": "Nummerierung",
    "en": "Numbered List"
  };

  //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
  const action = () => editor.chain().focus().toggleOrderedList().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="orderedList" icon={NumberedListIcon} tooltip={translations[language]} />
{/if}
