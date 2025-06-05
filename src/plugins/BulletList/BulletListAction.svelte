<svelte:options customElement="yarte-bullet-list-button" />

<script lang="ts">
  import BulletListIcon from "../../../icons/list-unordered.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor, language = "en" }: { editor: Editor, language: "de" | "en" } = $props();

  const translations: Record<string, string> = {
    "de": "Aufzählung",
    "en": "Bulleted List"
  };

  //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
  const action = () => editor.chain().focus().toggleBulletList().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="bulletList" icon={BulletListIcon} tooltip={translations[language]} />
{/if}
