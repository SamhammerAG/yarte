<svelte:options customElement="ordered-list-button" />

<script lang="ts">
  import NumberedListIcon from "../../../icons/list-ordered.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor }: { editor: Editor } = $props();

  const action = () => editor.chain().focus().toggleOrderedList().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="ordered-list" icon={NumberedListIcon} />
{/if}
