<svelte:options customElement="bullet-list-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import BulletListIcon from "../../../icons/list-unordered.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";

  interface Props {
    editor: Editor;
  }

  let { editor }: Props = $props();

  const action = () => editor.chain().focus().toggleBulletList().run();
</script>

{#if editor}
  <SimpleButton key="bullet-list" {editor} {action} icon={BulletListIcon} />
{/if}
