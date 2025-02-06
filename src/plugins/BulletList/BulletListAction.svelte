<svelte:options customElement="bullet-list-button" />

<script lang="ts">
  import BulletListIcon from "../../../icons/list-unordered.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import type Props from "../../../types/Props";

  let { editor, readonly }: Props = $props();

  const action = () => editor.chain().focus().toggleBulletList().run();
</script>

{#if editor}
  <SimpleButton {editor} {readonly} {action} key="bullet-list" icon={BulletListIcon} />
{/if}
