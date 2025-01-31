<svelte:options customElement="strike-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import StrikeIcon from "../../../icons/strikethrough.svg?raw";

  interface Props {
    editor: Editor;
  }

  let { editor }: Props = $props();

  const action = () => editor.chain().focus().toggleStrike().run();
</script>

{#if editor}
  <SimpleButton key="strike" {editor} {action} icon={StrikeIcon} />
{/if}
