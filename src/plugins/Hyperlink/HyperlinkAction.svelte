<svelte:options customElement="hyperlink-button" />

<script lang="ts">
  import LinkIcon from "../../../icons/link.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type Props from "../../../types/Props";

  let { editor, readonly }: Props = $props();

  const action = () => {
    document.dispatchEvent(new CustomEvent("showLinkBubbleMenu", { detail: { show: true } }));
    editor.chain().focus().run();
  };
</script>

{#if editor}
  <SimpleButton {editor} {readonly} {action} key="link" icon={LinkIcon} />
{/if}
