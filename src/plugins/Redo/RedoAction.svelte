<svelte:options customElement="redo-button" />

<script lang="ts">
  import RedoIcon from "../../../icons/arrow-go-forward-line.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor }: { editor: Editor } = $props();

  //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
  const action = () => editor.chain().focus().redo().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="redo" icon={RedoIcon} />
{/if}
