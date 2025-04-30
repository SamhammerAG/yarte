<svelte:options customElement="yarte-strike-button" />

<script lang="ts">
  import SimpleButton from "../../base/SimpleButton.svelte";
  import StrikeIcon from "../../../icons/strikethrough.svg?raw";
  import type { Editor } from "@tiptap/core";

  let { editor }: { editor: Editor } = $props();

  //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
  const action = () => editor.chain().focus().toggleStrike().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="strike" icon={StrikeIcon} />
{/if}
