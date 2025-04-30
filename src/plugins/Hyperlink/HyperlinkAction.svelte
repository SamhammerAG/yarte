<svelte:options customElement="yarte-hyperlink-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import LinkIcon from "../../../icons/link.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";

  let { editor }: { editor: Editor } = $props();

  const action = () => {
    document.dispatchEvent(new CustomEvent("showLinkBubbleMenu", { detail: { show: true } }));
    editor.chain().focus().run();
  };
</script>

{#if editor}
  <SimpleButton {editor} {action} key="link" icon={LinkIcon} />
{/if}
