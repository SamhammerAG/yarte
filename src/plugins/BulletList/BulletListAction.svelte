<svelte:options customElement="yarte-bullet-list-button" />

<script lang="ts">
  import BulletListIcon from "../../../icons/list-unordered.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor }: { editor: Editor } = $props();

  //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
  const action = () => editor.chain().focus().toggleBulletList().run();
</script>

{#if editor}
  <SimpleButton {editor} {action} key="bulletList" icon={BulletListIcon} />
{/if}
