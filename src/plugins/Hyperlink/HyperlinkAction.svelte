<svelte:options customElement="hyperlink-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import LinkIcon from "../../../icons/link.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";

  interface Props {
    editor: Editor;
  }

  let key = "link";

  let { editor }: Props = $props();

  const action = () => {
    document.dispatchEvent(new CustomEvent("showLinkBubbleMenu", { detail: { show: true } }));
    editor.chain().focus().run();
  };
</script>

{#if editor}
  <SimpleButton {editor} {key} {action} icon={LinkIcon} />
{/if}
