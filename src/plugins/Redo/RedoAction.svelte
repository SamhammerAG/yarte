<svelte:options customElement="redo-button" />

<script lang="ts">
  import RedoIcon from "../../../icons/arrow-go-forward-line.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor }: { editor: Editor } = $props();

  //@ts-ignore
  const action = () => editor.chain().focus().redo().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="redo" icon={RedoIcon} />
{/if}
