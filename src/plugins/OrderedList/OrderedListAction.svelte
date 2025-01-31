<svelte:options customElement="ordered-list-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import NumberedListIcon from "../../../icons/list-ordered.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";

  interface Props {
    editor: Editor;
  }

  let { editor }: Props = $props();

  const action = () => editor.chain().focus().toggleOrderedList().run();
</script>

{#if editor}
  <SimpleButton key="ordered-list" {editor} {action} icon={NumberedListIcon} />
{/if}
